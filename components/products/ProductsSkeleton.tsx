import { Skeleton } from "@/components/ui/skeleton";

export function ProductsSkeleton() {
  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="mb-8 flex items-center justify-between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="space-y-4">
        <div className="rounded-md border">
          <div className="h-12 border-b bg-muted/50" />
          {[1, 2, 3, 4, 5].map((id) => (
            <div
              key={id}
              className="flex items-center justify-between p-4 border-b last:border-0"
            >
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/5" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Skeleton className="h-10 w-[200px]" />
        </div>
      </div>
    </div>
  );
}
