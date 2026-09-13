import { auth } from "@clerk/nextjs/server";
import { err, ok, type Result } from "neverthrow";
import { dbAddInvoice, dbEditInvoice, dbGetInvoices } from "../db/queries";
import type { Invoice } from "../db/schema";
import type { DataFetchResponse } from "./clients"; // reusing the type

export async function getInvoices(
  page: number = 1,
): Promise<DataFetchResponse<{ invoices: Invoice[]; totalPages: number }>> {
  const { orgId } = await auth.protect();
  if (!orgId) {
    return { data: null, reason: "No active organization" };
  }
  return dbGetInvoices(page, orgId)
    .then((data) => {
      if (data) return { data, reason: null };
      return { data: null, reason: "Failed to fetch invoices" };
    })
    .catch((error: unknown) => {
      console.error("Failed to fetch invoices: ", error);
      return { data: null, reason: "Failed to fetch invoices" };
    });
}

export async function addInvoice(
  invoice: Invoice,
): Promise<Result<Invoice, string>> {
  const { orgId } = await auth.protect();
  if (!orgId) {
    return err("No active organization");
  }
  return dbAddInvoice(invoice, orgId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to add invoice: ", e);
      return err("Failed to add invoice");
    });
}

export async function editInvoice(
  id: string,
  updates: Partial<Invoice>,
): Promise<Result<Invoice, string>> {
  const { orgId } = await auth.protect();
  if (!orgId) {
    return err("No active organization");
  }
  return dbEditInvoice(id, updates, orgId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to edit invoice: ", e);
      return err("Failed to edit invoice");
    });
}
