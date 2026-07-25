import { CurveUnderLine } from "@/components/shared/curve-underline";
import PrimaryLink from "@/components/shared/primary-link";

export default function Hero() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center gap-40">
      <div className="flex max-w-115 flex-col gap-15">
        <h1 className="text-primary font-serif text-7xl font-normal">
          All Invoices
          <br />
          In <CurveUnderLine text="One Place." />
        </h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi quae
          dolorum et, quaerat ex similique fugiat minima, eius sint accusantium!
        </p>
        <div>
          <PrimaryLink link="signin" text="Open an account" />
        </div>
      </div>

      <div>
        <img
          src={"jar.webp"}
          className="animate-wiggle pointer-events-none hidden select-none md:block md:w-50"
          alt="jar with coins"
        />
      </div>
    </div>
  );
}
