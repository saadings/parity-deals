import { subscriptionTiers } from "@/data/subscriptionTiers";
import { db } from "@/drizzle/db";
import { UserSubscriptionTable } from "@/drizzle/schema";
import {
  CACHE_TAGS,
  dbCache,
  getUserTag,
  revalidateDbCache,
} from "@/lib/cache";
import type { SQL } from "drizzle-orm";

export const createUserSubscription = async (
  data: typeof UserSubscriptionTable.$inferInsert,
) => {
  const [newSubscription] = await db
    .insert(UserSubscriptionTable)
    .values(data)
    .onConflictDoNothing({ target: UserSubscriptionTable.clerkUserId })
    .returning({
      id: UserSubscriptionTable.id,
      userId: UserSubscriptionTable.clerkUserId,
    });

  if (!newSubscription) {
    throw new Error("User already has a subscription");
  }

  revalidateDbCache({
    tag: CACHE_TAGS.subscription,
    userId: newSubscription.userId,
    id: newSubscription.id,
  });

  return newSubscription;
};

export const getUserSubscription = async (userId: string) => {
  const cacheFn = dbCache(getUserSubscriptionInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.subscription)],
  });

  return cacheFn(userId);
};

export const getUserSubscriptionTier = async (userId: string) => {
  const subscription = await getUserSubscription(userId);

  if (subscription == null) throw new Error("User has no subscription");

  return subscriptionTiers[subscription.tier];
};

export async function updateUserSubscription(
  where: SQL,
  data: Partial<typeof UserSubscriptionTable.$inferInsert>,
) {
  const [updatedSubscription] = await db
    .update(UserSubscriptionTable)
    .set(data)
    .where(where)
    .returning({
      id: UserSubscriptionTable.id,
      userId: UserSubscriptionTable.clerkUserId,
    });

  if (updatedSubscription != null) {
    revalidateDbCache({
      tag: CACHE_TAGS.subscription,
      userId: updatedSubscription.userId,
      id: updatedSubscription.id,
    });
  }
}

// * Internals
const getUserSubscriptionInternal = async (userId: string) => {
  return db.query.UserSubscriptionTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
  });
};
