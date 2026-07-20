"use server";

import { updateTag } from "next/cache";
import { addClient, editClient } from "../dal/clients";
import type { Client } from "../db/schema";

export type ActionResponse<T> =
  | { data: T; reason: null }
  | { data: null; reason: string };

export async function addClientAction(
  client: Client,
): Promise<ActionResponse<Client>> {
  const dalResult = await addClient(client);

  return dalResult.match(
    (data) => {
      updateTag(`clients`);
      //For when we add auth
      // updateTag(`clients-${data.orgId}`)
      return { data, reason: null };
    },
    (reason) => {
      return { data: null, reason };
    },
  );
}

export async function editClientAction(
  id: string,
  updates: Partial<Client>,
): Promise<ActionResponse<Client>> {
  const dalResult = await editClient(id, updates);

  return dalResult.match(
    (data) => {
      updateTag(`clients`);
      //For when we add auth
      // updateTag(`clients-${data.orgId}`)
      return { data, reason: null };
    },
    (reason) => {
      return { data: null, reason };
    },
  );
}
