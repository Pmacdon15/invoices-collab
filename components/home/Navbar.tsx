import { Show, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import PrimaryLink from "@/components/shared/primary-link";
import SecondaryLink from "@/components/shared/secondary-link";

export default function Navbar() {
  return (
    <nav className="flex basis-full items-center justify-around px-2 py-4 font-medium md:px-8">
      <Show when={"signed-out"}>
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          <span className="font-bold">VivaPro</span>
        </Link>
        <ul className="hidden gap-8 *:duration-200 *:hover:-translate-y-0.5 md:flex">
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
        <div className="hidden items-center gap-4 md:flex">
          <SecondaryLink text="Sign in" link="/sign-in" />
          <PrimaryLink text="Get Started" link="/sign-up" size="small" />
        </div>
      </Show>
      <Show when={"signed-in"}>
        <ul className="flex min-w-full items-center justify-between">
          <li>
            <Link href={"/clients"} className="flex items-center gap-2">
              <Image src="/logo.png" alt="logo" width={32} height={32} />
              <span className="font-bold">VivaPro</span>
            </Link>
          </li>
          <li>
            <span className="md:hidden">
              <UserButton showName={false} />
            </span>
            <span className="hidden md:block">
              <UserButton showName={true} />
            </span>
          </li>
        </ul>
      </Show>
    </nav>
  );
}
