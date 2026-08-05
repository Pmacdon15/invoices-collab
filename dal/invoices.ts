import { auth } from "@clerk/nextjs/server";
import { err, ok, type Result } from "neverthrow";
import { dbAddInvoice, dbEditInvoice, dbGetInvoices } from "../db/queries";
import type { Invoice } from "../db/schema";
import type { DataFetchResponse } from "./clients"; // reusing the type

export async function getInvoices(
  page: number = 1,
): Promise<DataFetchResponse<{ invoices: Invoice[]; totalPages: number }>> {
  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbGetInvoices(page, tenantId)
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
  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbAddInvoice(invoice, tenantId)
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
  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbEditInvoice(id, updates, tenantId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to edit invoice: ", e);
      return err("Failed to edit invoice");
    });
}
