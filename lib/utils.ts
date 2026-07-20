import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function parseParams(p: string | string[] | unknown): string {
  if (Array.isArray(p)) return p[0] ?? "";
  if (typeof p === "string") return p;
  return "";
}