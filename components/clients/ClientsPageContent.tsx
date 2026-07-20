"use client";

import { startTransition, use, useOptimistic, useState } from "react";
import type { DataFetchResponse } from "../../dal/clients";
import type { Client } from "../../db/schema";
import { useClientMutations } from "../../mutations/useClientMutations";
import { Pagination } from "../Pagination";
import { Button } from "../ui/button";
import { AddClientDialog } from "./AddClientDialog";
import { ClientsTable } from "./ClientsTable";
import { EditClientDialog } from "./EditClientDialog";

export function ClientsPageContent({
  clientsPromise,
}: {
  clientsPromise: Promise<
    DataFetchResponse<{
      clients: Client[];
      totalPages: number;
    }>
  >;
}) {
  const { data, reason } = use(clientsPromise);
  const initialClients = data?.clients || [];
  const totalPages = data?.totalPages || 1;

  const [optimisticClients, setOptimisticClients] = useOptimistic(
    initialClients,
    (state, action: { type: "add" | "edit"; client: Client }) => {
      if (action.type === "add") {
        return [...state, action.client];
      }
      if (action.type === "edit") {
        return state.map((c) =>
          c.id === action.client.id ? action.client : c,
        );
      }
      return state;
    },
  );

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const { addMutation, editMutation } = useClientMutations({
    onAddSuccess: () => setIsAddOpen(false),
    onEditSuccess: () => setEditingClient(null),
  });

  const handleAdd = (newData: Client) => {
    startTransition(() => {
      setOptimisticClients({
        type: "add",
        client: { ...newData, id: crypto.randomUUID() },
      });
    });
    addMutation.mutate(newData);
  };

  const handleEdit = (newData: Client) => {
    if (!editingClient?.id) return;
    startTransition(() => {
      setOptimisticClients({
        type: "edit",
        client: { ...newData, id: editingClient.id },
      });
    });
    editMutation.mutate({ id: editingClient.id, updates: newData });
  };

  if (reason) {
    return (
      <div className="mx-auto max-w-5xl p-8 bg-white text-zinc-900">
        <p className="text-red-500 font-medium bg-red-50 p-4 rounded-md">
          Error: {reason}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
        <Button onClick={() => setIsAddOpen(true)}>Add Client</Button>
      </div>
      {reason ? (
        <div className="mx-auto max-w-5xl p-8 bg-white text-zinc-900">
          <p className="text-red-500 font-medium bg-red-50 p-4 rounded-md">
            Error: {reason}
          </p>
        </div>
      ) : (
        <>
          <ClientsTable
            clients={optimisticClients}
            onEditClient={setEditingClient}
          />
          <Pagination totalPages={totalPages} />
        </>
      )}

      <AddClientDialog
        onOpenChange={setIsAddOpen}
        onSubmit={handleAdd}
        open={isAddOpen}
      />

      <EditClientDialog
        client={editingClient}
        onClose={() => setEditingClient(null)}
        onSubmit={handleEdit}
      />
    </>
  );
}
