import { auth } from "@clerk/nextjs/server";
import { err, ok, type Result } from "neverthrow";
import { z } from "zod";
import { dbAddClient, dbEditClient, dbGetClients } from "../db/queries";
import { type Client, ClientSchema } from "../db/schema";

export type DataFetchResponse<T> = { data: T | null; reason: string | null };

export async function getClients(
  page: number = 1,
  limit = 10,
): Promise<DataFetchResponse<{ clients: Client[]; totalPages: number }>> {
  const parsed = z
    .object({
      page: z.number().int(),
      limit: z.number().int(),
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
  return dbGetClients(tenantId, validPage, validLimit)
    .then((data) => {
      if (data) return { data, reason: null };
      return { data: null, reason: "Failed to fetch clients" };
    })
    .catch((error: unknown) => {
      console.error("Failed to fetch Clients: ", error);
      return { data: null, reason: "Failed to fetch clients" };
    });
}

export async function addClient(
  client: Client,
): Promise<Result<Client, string>> {
  const parsed = ClientSchema.safeParse(client);
  if (!parsed.success)
    return err(`Invalid client data: ${parsed.error.message}`);

  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbAddClient(parsed.data, tenantId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to add client: ", e);
      return err("Failed to add client");
    });
}

export async function editClient(
  id: string,
  updates: Partial<Client>,
): Promise<Result<Client, string>> {
  const parsedId = z.string().uuid().safeParse(id);
  if (!parsedId.success) {
    return err(`Invalid client ID: ${parsedId.error.message}`);
  }
  const parsed = ClientSchema.partial().safeParse(updates);
  if (!parsed.success) {
    return err(`Invalid client data: ${parsed.error.message}`);
  }
  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbEditClient(parsedId.data, parsed.data, tenantId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to edit client: ", e);
      return err("Failed to edit client");
    });
}
