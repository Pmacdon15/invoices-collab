"use server";

import { revalidatePath } from "next/cache";
import type { Client } from "../db/schema";
import { addClient, editClient } from "./clients";

export type ActionResponse<T> =
  | { data: T; reason: null }
  | { data: null; reason: string };

export async function addClientAction(
  client: Client,
): Promise<ActionResponse<Client>> {
  const dalResult = await addClient(client);

  return dalResult.match(
    (data) => {
      revalidatePath("/clients");
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
      revalidatePath("/clients");
      return { data, reason: null };
    },
    (reason) => {
      return { data: null, reason };
    },
  );
}
