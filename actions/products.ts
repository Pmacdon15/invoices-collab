"use server";

import { updateTag } from "next/cache";
import { addProduct, editProduct } from "../dal/products";
import type { Product } from "../db/schema";
import type { ActionResponse } from "./clients"; // reusing the type

export async function addProductAction(
  product: Product,
): Promise<ActionResponse<Product>> {
  const dalResult = await addProduct(product);

  return dalResult.match(
    (data) => {
      updateTag(`products-${data.orgId}`);
      return { data, reason: null };
    },
    (reason) => {
      return { data: null, reason };
    },
  );
}

export async function editProductAction(
  id: string,
  updates: Partial<Product>,
): Promise<ActionResponse<Product>> {
  const dalResult = await editProduct(id, updates);
  return dalResult.match(
    (data) => {
      updateTag(`products-${data.orgId}`);
      return { data, reason: null };
    },
    (reason) => {
      return { data: null, reason };
    },
  );
}
