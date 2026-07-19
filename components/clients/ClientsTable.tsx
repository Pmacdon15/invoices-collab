import { Client } from "../../db/schema";
import { Button } from "../ui/button";

interface ClientsTableProps {
  clients: Client[];
  onEditClient: (client: Client) => void;
}

export function ClientsTable({ clients, onEditClient }: ClientsTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 font-medium text-zinc-500">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Phone</th>
            <th className="px-6 py-4">Address</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white">
          {clients.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                No clients found. Add one to get started.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id} className="hover:bg-zinc-50/50">
                <td className="px-6 py-4 font-medium text-zinc-900">{client.name}</td>
                <td className="px-6 py-4 text-zinc-500">{client.email || "-"}</td>
                <td className="px-6 py-4 text-zinc-500">{client.phone || "-"}</td>
                <td className="px-6 py-4 text-zinc-500 truncate max-w-[200px]">{client.address || "-"}</td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditClient(client)}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
