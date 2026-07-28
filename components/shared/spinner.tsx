import { LoaderCircle } from "lucide-react";

export default function Spinner({
  size = "base",
}: {
  size?: "sm" | "base" | "lg";
}) {
  const sizeMap = {
    sm: 24,
    base: 60,
    lg: 84,
  };

  const containerSize = {
    sm: "auto",
    base: "min-h-[70vh]",
    lg: "min-h-[80vh]",
  };

  return (
    <div className={`flex ${containerSize[size]} items-center justify-center`}>
      <LoaderCircle
        color="var(--primary)"
        strokeWidth={2}
        size={sizeMap[size]}
        className="animate-spin"
      />
    </div>
  );
}
