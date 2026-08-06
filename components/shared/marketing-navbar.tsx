import { GripHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PrimaryLink from "@/components/shared/primary-link";
import SecondaryLink from "@/components/shared/secondary-link";

export default function MarketingNavbar() {
  return (
    <nav className="flex basis-full items-center justify-between px-2 py-4 font-medium md:px-8 h-18">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.webp" alt="logo" width={32} height={32} />
        <span className="font-bold">VivaPro</span>
      </Link>
      <ul className="hidden items-center gap-8 *:duration-200 *:hover:-translate-y-0.5 md:flex">
        <li>
          <Link href="/#about">About</Link>
        </li>
        <li>
          <Link href="/#works">How it works</Link>
        </li>
        <li>
          <Link href="/pricing">Pricing</Link>
        </li>
        <li>
          <GripHorizontal />
        </li>
        <li>
          <SecondaryLink text="Sign in" link="/sign-in" />
        </li>
        <li>
          <PrimaryLink text="Get Started" link="/sign-up" size="small" />
        </li>
      </ul>
    </nav>
  );
}
