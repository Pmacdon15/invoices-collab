import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="border-t p-4 font-medium">
      <div className="flex flex-col justify-evenly md:flex-row">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={96} height={96} />
          <span className="font-bold text-2xl md:text-4xl">
            VivaPro - Invoices
          </span>
        </Link>
        <ul className="flex flex-col gap-4 p-4">
          <li>
            <Link href="/#about">About</Link>
          </li>
          <li>
            <Link href="/#works">How it works</Link>
          </li>
          <li>
            <Link href="/pricing">Pricing</Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-4 p-4">
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms and Conditions</Link>
          </li>
          <li className="font-bold text-primary">
            VivaPro © 2026 . All rights reserved.
          </li>
        </ul>
      </div>
    </div>
  );
}
