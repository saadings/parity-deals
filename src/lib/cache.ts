import { revalidateTag, unstable_cache } from "next/cache";
import { cache } from "react";

export type ValidTags =
  | ReturnType<typeof getGlobalTag>
  | ReturnType<typeof getUserTag>
  | ReturnType<typeof getIdTag>;

export const CACHE_TAGS = {
  products: "products",
  productViews: "productViews",
  countries: "countries",
  countryGroups: "countryGroups",
  subscription: "subscription",
} as const;

export const getGlobalTag = (tag: keyof typeof CACHE_TAGS) => {
  return `global:${CACHE_TAGS[tag]}` as const;
};

export const getUserTag = (userId: string, tag: keyof typeof CACHE_TAGS) => {
  return `user:${userId}-${CACHE_TAGS[tag]}` as const;
};

export const getIdTag = (id: string, tag: keyof typeof CACHE_TAGS) => {
  return `id:${id}-${CACHE_TAGS[tag]}` as const;
};

export const clearFullCache = async () => {
  revalidateTag("*");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dbCache = <T extends (...args: any[]) => Promise<any>>(
  cb: Parameters<typeof unstable_cache<T>>[0],
  { tags }: { tags: ValidTags[] },
) => {
  // return cache(unstable_cache<T>(cb, undefined, { tags: [...tags, "*"] }));
  return unstable_cache<T>(cb, undefined, { tags: [...tags, "*"] });
};

export const revalidateDbCache = ({
  tag,
  userId,
  id,
}: {
  tag: keyof typeof CACHE_TAGS;
  userId?: string;
  id?: string;
}) => {
  revalidateTag(getGlobalTag(tag));

  if (userId) {
    revalidateTag(getUserTag(userId, tag));
  }

  if (id) {
    revalidateTag(getIdTag(id, tag));
  }
};
