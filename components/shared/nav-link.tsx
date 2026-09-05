"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

function NavLink({ href, text }: { href: string; text: string }) {
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

export function NavLinkWrapper(props: { href: string; text: string }) {
  return (
    <Suspense
      fallback={
        <Link
          href={props.href}
          className="text-muted-foreground/60 hover:text-foreground"
        >
          {props.text}
        </Link>
      }
    >
      <NavLink {...props} />
    </Suspense>
  );
}
