import Image from "next/image";
import Link from "next/link";
import SecondaryLink from "@/components/shared/secondary-link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-evenly px-2 py-4 font-medium md:basis-full md:px-8">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={24} height={24} />
        <span className="font-bold">VivaPro</span>
      </Link>
      <ul className="hidden gap-8 *:duration-200 *:hover:-translate-y-0.5 md:flex">
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
      <div className="hidden md:flex">
        <SecondaryLink text="Sign in" link="/signin" />
      </div>
    </nav>
  );
}
