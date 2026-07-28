import { Show } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import { PanelLeftIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const data = {
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "About",
          url: "#about",
        },
        {
          title: "How it works",
          url: "#works",
        },
        {
          title: "Pricing",
          url: "/pricing",
        },
      ],
    },
    {
      title: "Learn more",
      url: "/",
      items: [
        {
          title: "Terms and Conditions",
          url: "/terms",
        },
        {
          title: "Privacy Policy",
          url: "/privacy",
        },
      ],
    },
    {
      title: "Already have an account?",
      url: "/",
      items: [
        {
          title: "Sign in",
          url: "/sign-in",
        },
      ],
    },
  ],
};

export function AppSidebar({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <PanelLeftIcon />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[18rem] bg-sidebar p-0 text-sidebar-foreground border-sidebar-border">
          <SheetHeader className="p-4 border-b border-sidebar-border text-left">
            <SheetTitle asChild>
              <Link href={"/"} className="flex items-center gap-2 w-fit">
                <Image src="/logo.png" alt="logo" width={48} height={48} />
                <span className="font-bold text-xl">VivaPro</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 p-2 overflow-auto">
            <Show when="signed-out">
              {data.navMain.map((item) => (
                <div key={item.title} className="flex flex-col gap-1 p-2">
                  <div className="flex h-8 items-center px-2 text-xs font-medium text-sidebar-foreground/70">
                    {item.title}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.url}
                        className="flex h-8 w-full items-center gap-2 overflow-hidden rounded-md px-2 text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </Show>
            {/* todo: add array for signed in users*/}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
