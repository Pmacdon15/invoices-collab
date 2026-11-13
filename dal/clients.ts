import { auth } from "@clerk/nextjs/server";
import { err, ok, type Result } from "neverthrow";
import { dbAddClient, dbEditClient, dbGetClients } from "../db/queries";
import type { Client } from "../db/schema";

export type DataFetchResponse<T> = { data: T | null; reason: string | null };

export async function getClients(
  page: number = 1,
  limit = 10,
): Promise<DataFetchResponse<{ clients: Client[]; totalPages: number }>> {
  const { orgId } = await auth.protect();
  if (!orgId) {
    return { data: null, reason: "No active organization" };
  }
  return dbGetClients(orgId, page, limit)
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
  const { orgId } = await auth.protect();
  if (!orgId) {
    return err("No active organization");
  }
  return dbAddClient(client, orgId)
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
  const { orgId } = await auth.protect();
  if (!orgId) {
    return err("No active organization");
  }
  return dbEditClient(id, updates, orgId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to edit client: ", e);
      return err("Failed to edit client");
    });
}
