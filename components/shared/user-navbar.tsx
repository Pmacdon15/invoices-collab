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
      <span className="md:hidden">
        <UserButton showName={false} />
      </span>
      <span className="hidden md:block">
        <UserButton showName={true} />
      </span>
    </nav>
  );
}
