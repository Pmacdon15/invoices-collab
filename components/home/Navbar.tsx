import Image from "next/image";
import Link from "next/link";
import SecondaryLink from "@/components/shared/secondary-link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-evenly border-border border-b-2 px-2 py-4 font-medium md:px-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={24} height={24} />
        <span className="font-bold">VivaPro</span>
      </Link>
      <ul className="flex gap-8 *:duration-200 *:hover:-translate-y-0.5">
        <li>
          <Link href="#about">About</Link>
        </li>
        <li>
          <Link href="#works">How it works</Link>
        </li>
        <li>
          <Link href="/pricing">Pricing</Link>
        </li>
      </ul>
      <SecondaryLink text="Sign in" link="/signin" />
    </nav>
  );
}
