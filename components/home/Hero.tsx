import Image from "next/image";
import { CurveUnderLine } from "@/components/shared/curve-underline";
import PrimaryLink from "@/components/shared/primary-link";
import SecondaryLink from "@/components/shared/secondary-link";

export default function Hero() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-20 p-5 md:flex-row md:gap-40">
      <div className="flex max-w-115 flex-col gap-4">
        <h1 className="font-normal font-serif text-5xl text-foreground leading-20 md:text-7xl md:leading-25">
          All <CurveUnderLine text="Invoices" />
          <br />
          In One Place.
        </h1>
        <p>
          Manage customers, catalog products, and generate professional invoices
          in seconds. Everything you need.
        </p>
        <div className="flex items-center gap-5">
          <PrimaryLink link="signup" text="Open an account" />
          <SecondaryLink link="#" text="See how it works" />
        </div>
      </div>
      <div>
        <Image
          src={"/jar.webp"}
          width={300}
          height={500}
          className="pointer-events-none h-75 w-auto animate-wiggle select-none"
          alt="jar with coins"
        />
      </div>
    </div>
  );
}
