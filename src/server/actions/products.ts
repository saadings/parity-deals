"use server";

import {
  productCountryDiscountsSchema,
  productCustomizationSchema,
  productDetailsSchema,
} from "@/schemas/products";
import {
  createProduct as createProductDb,
  deleteProduct as deleteProductDb,
  updateCountryDiscounts as updateCountryDiscountsDb,
  updateProductCustomization as updateProductCustomizationDb,
  updateProduct as updateProductDb,
} from "@/server/db/products";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { z } from "zod";
import { canCreateProduct, canCustomizeBanner } from "../permissions";

export const createProduct = async (
  unsafeData: z.infer<typeof productDetailsSchema>,
): Promise<{ error: boolean; message: string } | undefined> => {
  const { userId } = await auth();
  const { success, data } = productDetailsSchema.safeParse(unsafeData);
  const canCreate = await canCreateProduct(userId);

  if (!success || userId == null || !canCreate) {
    return { error: true, message: "There was an error creating your product" };
  }

  const { id } = await createProductDb({ ...data, clerkUserId: userId });

  redirect(`/dashboard/products/${id}/edit?tab=countries`);
};

export const updateProduct = async (
  id: string,
  unsafeData: z.infer<typeof productDetailsSchema>,
): Promise<{ error: boolean; message: string } | undefined> => {
  const { userId } = await auth();

  const errorMessage = "There was an error updating your product";

  const { success, data } = productDetailsSchema.safeParse(unsafeData);

  if (!success || !userId) {
    return { error: true, message: errorMessage };
  }

  try {
    const isSuccess = await updateProductDb(data, { id, userId });

    return { error: !isSuccess, message: "Successfully Updated your Product" };
  } catch (error) {
    return {
      error: true,
      message: error instanceof Error ? error.message : errorMessage,
    };
  }
};

export const deleteProduct = async (id: string) => {
  const { userId } = await auth();
  const errorMessage = "There was an error deleting your product";

  if (!userId) {
    return { error: true, message: errorMessage };
  }

  const isSuccess = await deleteProductDb({ id, userId });

  return {
    error: !isSuccess,
    message: isSuccess ? "Successfully Deleted your Product" : errorMessage,
  };
};

export async function updateCountryDiscounts(
  id: string,
  unsafeData: z.infer<typeof productCountryDiscountsSchema>,
) {
  const { userId } = await auth();
  const { success, data } = productCountryDiscountsSchema.safeParse(unsafeData);

  if (!success || userId == null) {
    return {
      error: true,
      message: "There was an error saving your country discounts",
    };
  }

  const insert: {
    countryGroupId: string;
    productId: string;
    coupon: string;
    discountPercentage: number;
  }[] = [];
  const deleteIds: { countryGroupId: string }[] = [];

  data.groups.forEach((group) => {
    if (
      group.coupon != null &&
      group.coupon.length > 0 &&
      group.discountPercentage != null &&
      group.discountPercentage > 0
    ) {
      insert.push({
        countryGroupId: group.countryGroupId,
        coupon: group.coupon,
        discountPercentage: group.discountPercentage / 100,
        productId: id,
      });
    } else {
      deleteIds.push({ countryGroupId: group.countryGroupId });
    }
  });

  await updateCountryDiscountsDb(deleteIds, insert, { productId: id, userId });

  return { error: false, message: "Country discounts saved" };
}

export async function updateProductCustomization(
  id: string,
  unsafeData: z.infer<typeof productCustomizationSchema>,
) {
  const { userId } = await auth();
  const { success, data } = productCustomizationSchema.safeParse(unsafeData);
  const canCustomize = await canCustomizeBanner(userId);

  if (!success || userId == null || !canCustomize) {
    return {
      error: true,
      message: "There was an error updating your banner",
    };
  }

  await updateProductCustomizationDb(data, { productId: id, userId });

  return { error: false, message: "Banner updated" };
}
