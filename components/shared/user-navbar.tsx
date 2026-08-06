import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function UserNavbar() {
  return (
    <nav className="flex basis-full items-center justify-between px-2 py-4 font-medium md:px-8">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.webp" alt="logo" width={32} height={32} />
        <span className="font-bold">VivaPro</span>
      </Link>
      <ul className="hidden items-center gap-8 *:duration-200 *:hover:-translate-y-0.5 md:flex">
        <li>
          <Link href="/clients">Clients</Link>
        </li>
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li>
          <Link href="/invoices">Invoices</Link>
        </li>
        <li className="hidden md:block">
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
        </li>
      </ul>
    </nav>
  );
}
