import { env } from "@/data/env/server";
import { getTierByPriceId, subscriptionTiers } from "@/data/subscriptionTiers";
import { UserSubscriptionTable } from "@/drizzle/schema";
import { updateUserSubscription } from "@/server/db/subscription";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return new Response("No signature", { status: 400 });
  }

  let event;

  const payload = await request.text();

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : "An error occurred"}`,
      { status: 400 },
    );
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.deleted": {
      await handleDelete(event.data.object);
      break;
    }
    case "customer.subscription.updated": {
      await handleUpdate(event.data.object);
      break;
    }
    case "customer.subscription.created": {
      await handleCreate(event.data.object);
      break;
    }

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return new Response(null, { status: 200 });
}

async function handleCreate(subscription: Stripe.Subscription) {
  const tier = getTierByPriceId(subscription.items.data[0].price.id);

  const clerkUserId = subscription.metadata.clerkUserId;

  if (!clerkUserId || !tier) {
    return new Response(null, { status: 500 });
  }

  const customer = subscription.customer;
  const customerId = typeof customer === "string" ? customer : customer.id;

  return await updateUserSubscription(
    eq(UserSubscriptionTable.clerkUserId, clerkUserId),
    {
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionItemId: subscription.items.data[0].id,
      tier: tier.name,
    },
  );
}

async function handleUpdate(subscription: Stripe.Subscription) {
  const tier = getTierByPriceId(subscription.items.data[0].price.id);
  const customer = subscription.customer;
  const customerId = typeof customer === "string" ? customer : customer.id;

  if (tier == null) {
    return new Response(null, { status: 500 });
  }

  return await updateUserSubscription(
    eq(UserSubscriptionTable.stripeCustomerId, customerId),
    { tier: tier.name },
  );
}

async function handleDelete(subscription: Stripe.Subscription) {
  const customer = subscription.customer;
  const customerId = typeof customer === "string" ? customer : customer.id;

  return await updateUserSubscription(
    eq(UserSubscriptionTable.stripeCustomerId, customerId),
    {
      tier: subscriptionTiers.Free.name,
      stripeSubscriptionId: null,
      stripeSubscriptionItemId: null,
    },
  );
}
