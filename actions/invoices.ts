"use server";

import { updateTag } from "next/cache";
import { addInvoice, editInvoice } from "../dal/invoices";
import type { Invoice } from "../db/schema";
import type { ActionResponse } from "./clients"; // reusing the type

export async function addInvoiceAction(
  invoice: Invoice,
): Promise<ActionResponse<Invoice>> {
  const dalResult = await addInvoice(invoice);

  return dalResult.match(
    (data) => {
      updateTag(`invoices-${data.orgId}`);
      return { data, reason: null };
    },
    (reason) => {
      return { data: null, reason };
    },
  );
}

export async function editInvoiceAction(
  id: string,
  updates: Partial<Invoice>,
): Promise<ActionResponse<Invoice>> {
  const dalResult = await editInvoice(id, updates);
  return dalResult.match(
    (data) => {
      updateTag(`invoices-${data.orgId}`);
      return { data, reason: null };
    },
    (reason) => {
      return { data: null, reason };
    },
  );
}
