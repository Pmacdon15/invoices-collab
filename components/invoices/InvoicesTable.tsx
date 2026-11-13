"use client";

import type { InvoicesTableProps } from "@/types/types";
import { InvoicesDesktopTable } from "./InvoicesDesktopTable";
import { InvoicesMobileView } from "./InvoicesMobileView";

export function InvoicesTable(props: InvoicesTableProps) {
  return (
    <div className="rounded-md border bg-white overflow-hidden">
      <InvoicesMobileView {...props} />
      <InvoicesDesktopTable {...props} />
    </div>
  );
}
