import { ArrowRight, Circle } from "lucide-react";
import Link from "next/link";

export default function PrimaryLink({
  link,
  text,
  size = "base",
}: {
  link: string;
  text: string;
  size?: "small" | "base" | "lg";
}) {
  return (
    <Link
      href={link}
      className={`group relative flex max-w-fit items-center gap-2 rounded-2xl border-2 border-primary bg-primary ${size === "lg" ? "px-8 py-4" : "px-4 py-2"} font-semibold text-background text-sm ${size === "small" ? "md:text-sm" : "md:text-base"} duration-200 hover:scale-108 hover:bg-background hover:text-primary`}
    >
      <Circle
        fill="background"
        size={12}
        className="transition-all duration-300 ease-in-out group-hover:scale-0 group-hover:opacity-0"
      />
      <ArrowRight
        size={18}
        strokeWidth={3}
        className="absolute scale-0 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100"
      />
      {text}
    </Link>
  );
}
