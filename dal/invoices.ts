import { auth } from "@clerk/nextjs/server";
import { err, ok, type Result } from "neverthrow";
import { z } from "zod";
import { dbAddInvoice, dbEditInvoice, dbGetInvoices } from "../db/queries";
import { type Invoice, InvoiceSchema } from "../db/schema";
import type { DataFetchResponse } from "./clients"; // reusing the type

export async function getInvoices(
  page: number = 1,
): Promise<DataFetchResponse<{ invoices: Invoice[]; totalPages: number }>> {
  const parsed = z.number().int().positive().safeParse(page);
  if (!parsed.success) {
    return {
      data: null,
      reason: `Invalid page param: ${parsed.error.message}`,
    };
  }
  const validPage = parsed.data;

  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbGetInvoices(validPage, tenantId)
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
  const parsed = InvoiceSchema.safeParse(invoice);
  if (!parsed.success) {
    return err(`Invalid invoice data: ${parsed.error.message}`);
  }
  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbAddInvoice(parsed.data, tenantId)
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
  const parsedId = z.string().uuid().safeParse(id);
  if (!parsedId.success) {
    return err(`Invalid invoice ID: ${parsedId.error.message}`);
  }
  const parsed = InvoiceSchema.partial().safeParse(updates);
  if (!parsed.success) {
    return err(`Invalid invoice data: ${parsed.error.message}`);
  }
  const { userId, orgId } = await auth.protect();
  const tenantId = orgId ?? userId;
  return dbEditInvoice(parsedId.data, parsed.data, tenantId)
    .then((data) => {
      return ok(data);
    })
    .catch((e: unknown) => {
      console.error("Failed to edit invoice: ", e);
      return err("Failed to edit invoice");
    });
}
