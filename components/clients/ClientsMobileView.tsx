"use client";

import { Edit } from "lucide-react";
import type { Client } from "../../db/schema";
import { Button } from "../ui/button";

export interface ClientsMobileViewProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
}

export function ClientsMobileView({
  clients,
  onEditClient,
}: ClientsMobileViewProps) {
  return (
    <div className="block md:hidden divide-y divide-zinc-200">
      {clients.length === 0 ? (
        <div className="p-8 text-center text-zinc-500">
          No clients found. Add one to get started.
        </div>
      ) : (
        clients.map((client) => (
          <div key={client.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-zinc-900">{client.name}</p>
                <p className="text-sm text-zinc-500">
                  {client.email || "No email"}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditClient(client)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>

            {(client.phone || client.address) && (
              <div className="space-y-1 text-sm text-zinc-500">
                {client.phone && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Phone</span>
                    <span>{client.phone}</span>
                  </div>
                )}
                {client.address && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs text-zinc-400 shrink-0">
                      Address
                    </span>
                    <span className="text-right truncate max-w-[220px]">
                      {client.address}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
