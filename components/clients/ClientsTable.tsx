"use client";

import type { Client } from "../../db/schema";
import { ClientsDesktopTable } from "./ClientsDesktopTable";
import { ClientsMobileView } from "./ClientsMobileView";

export interface ClientsTableProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
}

export function ClientsTable(props: ClientsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
      <ClientsMobileView {...props} />
      <ClientsDesktopTable {...props} />
    </div>
  );
}
