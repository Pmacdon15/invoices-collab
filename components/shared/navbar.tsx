"use client";

import { Show, UserButton } from "@clerk/nextjs";
import { GripHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import PrimaryLink from "@/components/shared/primary-link";
import SecondaryLink from "@/components/shared/secondary-link";
import Spinner from "@/components/shared/spinner";

export default function Navbar() {
  return (
    <nav className="flex basis-full items-center justify-between px-2 py-4 font-medium md:px-8">
      <Link href={"/"} className="flex items-center gap-2">
        <Image src="/logo.png" alt="logo" width={32} height={32} />
        <span className="font-bold">VivaPro</span>
      </Link>
      <Suspense fallback={<Spinner size="sm" />}>
        <Show when={"signed-out"}>
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
        </Show>
        <Show when={"signed-in"}>
          <span className="md:hidden">
            <UserButton showName={false} />
          </span>
          <span className="hidden md:block">
            <UserButton showName={true} />
          </span>
        </Show>
      </Suspense>
    </nav>
  );
}
