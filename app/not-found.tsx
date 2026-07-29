import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-foreground">
      <h2 className="font-bold text-4xl">404 - Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="text-primary underline">
        Return Home
      </Link>
    </div>
  );
}
