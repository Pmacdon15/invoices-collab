"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinkWrapper({ href, text }: { href: string; text: string }) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={
        isActive
          ? "text-foreground"
          : "text-muted-foreground/60 hover:text-foreground"
      }
    >
      {text}
    </Link>
  );
}
