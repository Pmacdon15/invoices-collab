import { CurveUnderLine } from "@/components/shared/curve-underline";
import PrimaryLink from "@/components/shared/primary-link";
import SecondaryLink from "@/components/shared/secondary-link";

export default function Hero() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center gap-40">
      <div className="flex max-w-115 flex-col gap-15">
        <h1 className="font-normal font-serif text-7xl text-primary">
          All Invoices
          <br />
          In <CurveUnderLine text="One Place." />
        </h1>
        <div className="flex flex-col gap-10">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quae
            dolorum et, quaerat ex similique fugiat minima, eius sint
            accusantium!
          </p>
          <div className="flex items-center gap-5">
            <PrimaryLink link="signin" text="Open an account" />
            <SecondaryLink link="#" text="See how it works" />
          </div>
        </div>
      </div>

      <div>
        <img
          src={"jar.webp"}
          className="pointer-events-none hidden animate-wiggle select-none md:block md:w-50"
          alt="jar with coins"
        />
      </div>
    </div>
  );
}
