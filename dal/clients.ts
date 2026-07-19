import { err, ok, type Result } from 'neverthrow'
import { dbAddClient, dbEditClient, dbGetClients } from '../db/queries'
import type { Client } from '../db/schema'

export type DataFetchResponse<T> = { data: T | null; reason: string | null }

export async function getClients(): Promise<DataFetchResponse<Client[]>> {  
  return dbGetClients()
    .then((data) => {
      if (data) return { data, reason: null }
      return { data: null, reason: 'Failed to fetch clients' }
    })
    .catch((error: unknown) => {
      console.error('Failed to fetch Clients: ', error)
      return { data: null, reason: 'Failed to fetch clients' }
    })
}

export async function addClient(
  client: Client,
): Promise<Result<Client, string>> {
  return dbAddClient(client)
    .then((data) => {
      return ok(data)
    })
    .catch((e: unknown) => {
      console.error('Failed to add client: ', e)
      return err('Failed to add client')
    })
}

export async function editClient(
  id: string,
  updates: Partial<Client>,
): Promise<Result<Client, string>> {
  return dbEditClient(id, updates)
    .then((data) => {
      return ok(data)
    })
    .catch((e: unknown) => {
       console.error('Failed to edit client: ', e)
      return err('Failed to edit client')
    })
}