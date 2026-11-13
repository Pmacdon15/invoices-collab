import { auth } from "@clerk/nextjs/server";
import { err, ok, type Result } from "neverthrow";
import { dbAddProduct, dbEditProduct, dbGetProducts } from "../db/queries";
import type { Product } from "../db/schema";
import type { DataFetchResponse } from "./clients"; // reusing the type or defining it again

export async function getProducts(
  page: number = 1,
  limit = 10,
): Promise<DataFetchResponse<{ products: Product[]; totalPages: number }>> {
  const { orgId } = await auth.protect();
  if (!orgId) {
    return { data: null, reason: "No active organization" };
  }
  return dbGetProducts(page, orgId, limit)
    .then((data) => {
      if (data) return { data, reason: null };
      return { data: null, reason: "Failed to fetch products" };
    })
    .catch((error: unknown) => {
      console.error("Failed to fetch Products: ", error);
      return { data: null, reason: "Failed to fetch products" };
    });
}

export async function addProduct(
  product: Product,
): Promise<Result<Product, string>> {
  const { orgId } = await auth.protect();
  if (!orgId) {
    return err("No active organization");
  }
  return dbAddProduct(product, orgId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to add product: ", e);
      return err("Failed to add product");
    });
}

export async function editProduct(
  id: string,
  updates: Partial<Product>,
): Promise<Result<Product, string>> {
  const { orgId } = await auth.protect();
  if (!orgId) {
    return err("No active organization");
  }
  return dbEditProduct(id, updates, orgId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to edit product: ", e);
      return err("Failed to edit product");
    });
}
