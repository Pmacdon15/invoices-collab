import { auth } from "@clerk/nextjs/server";
import { err, ok, type Result } from "neverthrow";
import { z } from "zod";
import { dbAddProduct, dbEditProduct, dbGetProducts } from "../db/queries";
import { type Product, ProductSchema } from "../db/schema";
import type { DataFetchResponse } from "./clients"; // reusing the type or defining it again

export async function getProducts(
  page: number = 1,
  limit = 10,
): Promise<DataFetchResponse<{ products: Product[]; totalPages: number }>> {
  const parsed = z
    .object({
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
    })
    .safeParse({ page, limit });
  if (!parsed.success) {
    return {
      data: null,
      reason: `Invalid pagination params: ${parsed.error.message}`,
    };
  }
  const { page: validPage, limit: validLimit } = parsed.data;

  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbGetProducts(validPage, tenantId, validLimit)
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
  const parsed = ProductSchema.safeParse(product);
  if (!parsed.success) {
    return err(`Invalid product data: ${parsed.error.message}`);
  }
  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbAddProduct(parsed.data, tenantId)
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
  const parsedId = z.string().uuid().safeParse(id);
  if (!parsedId.success) {
    return err(`Invalid product ID: ${parsedId.error.message}`);
  }
  const parsed = ProductSchema.partial().safeParse(updates);
  if (!parsed.success) {
    return err(`Invalid product data: ${parsed.error.message}`);
  }
  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbEditProduct(parsedId.data, parsed.data, tenantId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to edit product: ", e);
      return err("Failed to edit product");
    });
}
