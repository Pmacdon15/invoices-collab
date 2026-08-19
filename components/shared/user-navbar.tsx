import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { NavLinkWrapper } from "@/components/shared/nav-link";

export default function UserNavbar() {
  return (
    <nav className="flex basis-full items-center justify-between px-2 py-4 font-medium md:px-8 h-18">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.webp" alt="logo" width={32} height={32} />
        <span className="font-bold">VivaPro</span>
      </Link>
      <ul className="hidden items-center gap-8 *:duration-200 *:hover:-translate-y-0.5 md:flex">
        <li>
          <NavLinkWrapper href="/clients" text="Clients" />
        </li>
        <li>
          <NavLinkWrapper href="/products" text="Products" />
        </li>
        <li>
          <NavLinkWrapper href="/invoices" text="Invoices" />
        </li>
        <li className="hidden md:block min-w-9 min-h-9">
          <ClerkLoading>
            <div className="h-8 w-8 animate-pulse rounded-full bg-primary" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton
              showName={false}
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "2.25rem",
                    height: "2.25rem",
                  },
                },
              }}
            />
          </ClerkLoaded>
        </li>
      </ul>
    </nav>
  );
}
