"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";

export function Pagination({ totalPages }: { totalPages?: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="flex items-center justify-between sm:justify-start gap-2 mt-4">
      <Button
        variant="outline"
        onClick={() => router.push(createPageURL(currentPage - 1))}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>
      <span className="text-sm font-medium">Page {currentPage}</span>
      <Button
        variant="outline"
        onClick={() => router.push(createPageURL(currentPage + 1))}
        disabled={totalPages ? currentPage >= totalPages : false}
      >
        Next
      </Button>
    </div>
  );
}
