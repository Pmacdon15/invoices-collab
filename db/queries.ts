import type { Client } from "./schema";

const FAKE_CLIENTS: Client[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "098-765-4321",
    address: "456 Oak Ave",
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function dbGetClients(): Promise<Client[]> {
  await delay(300);
  return FAKE_CLIENTS;
}

export async function dbAddClient(client: Client): Promise<Client> {
  await delay(300);
  const newClient = {
    ...client,
    id: crypto.randomUUID(),
    createdAt: new Date(),
  };
  FAKE_CLIENTS.push(newClient);
  return newClient;
}

export async function dbEditClient(
  id: string,
  updates: Partial<Client>,
): Promise<Client> {
  await delay(300);
  const index = FAKE_CLIENTS.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error("Client not found");
  }

  const updatedClient = { ...FAKE_CLIENTS[index], ...updates };
  FAKE_CLIENTS[index] = updatedClient;
  return updatedClient;
}
