import { neon } from "@neondatabase/serverless";
import { cacheTag } from "next/cache";
import type { Client, Product } from "./schema";

const sql = neon(String(process.env.DATABASE_URL));

export async function dbGetClients(
  page: number = 1,
  orgId: string | undefined,
): Promise<{ clients: Client[]; totalPages: number }> {
  "use cache";
  cacheTag(`clients-${page}-${orgId}`, `clients-${orgId}`);
  const limit = 10;
  const pageNumber = Number(page) || 1;
  const offset = (pageNumber - 1) * limit;

  const rows = await sql`
    SELECT id, org_id, name, email, phone, address, created_at as "createdAt",
           COUNT(*) OVER() AS total_count
    FROM clients
    WHERE org_id = ${orgId}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  if (rows.length === 0) {
    return { clients: [], totalPages: 0 };
  }

  const totalCount = Number(rows[0].total_count);
  const totalPages = Math.ceil(totalCount / limit);

  const clients = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    address: row.address,
    createdAt: row.createdAt,
    orgId: row.org_id,
  }));

  return { clients, totalPages };
}

export async function dbAddClient(
  client: Client,
  orgId: string | undefined,
): Promise<Client> {
  const rows = await sql`
    INSERT INTO clients (org_id, name, email, phone, address)
    VALUES (${orgId}, ${client.name}, ${client.email}, ${client.phone}, ${client.address})
    RETURNING id, org_id as "orgId", name, email, phone, address, created_at as "createdAt"
  `;
  return rows[0] as Client;
}

export async function dbEditClient(
  id: string,
  updates: Partial<Client>,
  orgId: string | undefined,
): Promise<Client> {
  // Using COALESCE to only update fields that are provided
  const rows = await sql`
    UPDATE clients
    SET name = COALESCE(${updates.name ?? null}, name),
        email = COALESCE(${updates.email ?? null}, email),
        phone = COALESCE(${updates.phone ?? null}, phone),
        address = COALESCE(${updates.address ?? null}, address)
    WHERE id = ${id} AND org_id = ${orgId}
    RETURNING id, org_id as "orgId", name, email, phone, address, created_at as "createdAt"
  `;

  if (rows.length === 0) {
    throw new Error("Client not found");
  }

  return rows[0] as Client;
}

export async function dbGetProducts(
  page: number = 1,
  // userId: string,
  orgId: string | undefined,
): Promise<{ products: Product[]; totalPages: number }> {
  "use cache";
  cacheTag(`products-${page}-${orgId}`, `products-${orgId}`);
  const limit = 10;
  const pageNumber = Number(page) || 1;
  const offset = (pageNumber - 1) * limit;

  const rows = await sql`
    SELECT id, name, description, price, sku, created_at as "createdAt",
           COUNT(*) OVER() AS total_count
    FROM products
    WHERE org_id = ${orgId}
    ORDER BY created_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  if (rows.length === 0) {
    return { products: [], totalPages: 0 };
  }

  const totalCount = Number(rows[0].total_count);
  const totalPages = Math.ceil(totalCount / limit);

  const products = rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: row.price,
    sku: row.sku,
    createdAt: row.createdAt,
    orgId: row.org_id,
  }));

  return { products, totalPages };
}

export async function dbAddProduct(
  product: Product,
  orgId: string | undefined,
): Promise<Product> {
  const rows = await sql`
    INSERT INTO products (org_id, name, description, price, sku)
    VALUES (${orgId}, ${product.name}, ${product.description}, ${product.price}, ${product.sku})
    RETURNING id, org_id as "orgId", name, description, price, sku, created_at as "createdAt"
  `;
  return rows[0] as Product;
}

export async function dbEditProduct(
  id: string,
  updates: Partial<Product>,
  orgId: string | undefined,
): Promise<Product> {
  const rows = await sql`
    UPDATE products
    SET name = COALESCE(${updates.name ?? null}, name),
        description = COALESCE(${updates.description ?? null}, description),
        price = COALESCE(${updates.price ?? null}, price),
        sku = COALESCE(${updates.sku ?? null}, sku)
    WHERE id = ${id} AND org_id = ${orgId}
    RETURNING id, org_id as "orgId", name, description, price, sku, created_at as "createdAt"
  `;

  if (rows.length === 0) {
    throw new Error("Product not found");
  }

  return rows[0] as Product;
}
