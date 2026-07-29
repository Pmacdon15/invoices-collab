import { Link2 } from "lucide-react";
import Link from "next/link";
import PrimaryLink from "@/components/shared/primary-link";

export default function GetStarted() {
  return (
    <div className="before:content='' relative flex items-center justify-center text-secondary before:absolute before:bottom-30 before:-z-10 before:min-h-lvh before:min-w-screen before:bg-secondary">
      <div className="flex w-full max-w-5xl flex-col gap-10 rounded-2xl bg-muted-primary p-10 md:flex-row md:p-15">
        <div className="flex max-w-115 flex-col gap-4">
          <span className="font-semibold text-sm">TRY IT NOW</span>
          <h2 className="flex flex-col gap-2">
            <span className="font-normal text-2xl text-primary-foreground md:text-4xl">
              Ready to level up your business payments?
            </span>
          </h2>

          <p className="max-w-2xl text-base text-primary-foreground/80">
            Supports businesses with simple invoicing, powerful integrations,
            and cash flow management tools.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PrimaryLink link="sign-up" text="Get Started Now" size="lg" />
          <Link
            className="flex gap-2 rounded-2xl bg-background px-8 py-4 text-muted-primary transition-transform duration-100 hover:scale-108"
            href="/pricing"
          >
            <span className="font-bold">Pricing</span>
            <Link2 />
          </Link>
        </div>
      </div>
    </div>
  );
}
