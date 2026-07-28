import { LoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <LoaderCircle
        color="var(--primary)"
        strokeWidth={2}
        size={60}
        className="animate-spin"
      />
    </div>
  );
}
