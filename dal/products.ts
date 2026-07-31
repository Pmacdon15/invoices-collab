import { err, ok, type Result } from "neverthrow";
import { dbAddProduct, dbEditProduct, dbGetProducts } from "../db/queries";
import type { Product } from "../db/schema";
import type { DataFetchResponse } from "./clients"; // reusing the type or defining it again

export async function getProducts(page: number = 1): Promise<DataFetchResponse<{ products: Product[]; totalPages: number }>> {
  return dbGetProducts(page)
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
  return dbAddProduct(product)
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
  return dbEditProduct(id, updates)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to edit product: ", e);
      return err("Failed to edit product");
    });
}
