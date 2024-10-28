import { env } from "@/data/env/server";
import {
  createUserSubscription,
  getUserSubscription,
} from "@/server/db/subscription";
import { deleteUser } from "@/server/db/users";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { Webhook } from "svix";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  try {
    switch (evt.type) {
      case "user.created": {
        await createUserSubscription({
          clerkUserId: evt.data.id,
          tier: "Free",
        });
        return new Response("User Created Successfully", { status: 200 });
      }
      case "user.deleted": {
        if (!evt.data.id) {
          return new Response("User ID not found", { status: 400 });
        }

        const userSubscription = await getUserSubscription(evt.data.id);

        if (userSubscription?.stripeSubscriptionId != null) {
          await stripe.subscriptions.cancel(
            userSubscription.stripeSubscriptionId,
          );
        }

        await deleteUser(evt.data.id);

        return new Response("User Deleted Successfully", { status: 200 });
      }

      default:
        break;
    }

    return new Response("Event not handled", { status: 200 });
  } catch (err) {
    console.error("Internal Error occurred:", err);
    return new Response(
      `Internal Error occurred: ${err instanceof Error ? err.message : ""}`,
      { status: 500 },
    );
  }
}
