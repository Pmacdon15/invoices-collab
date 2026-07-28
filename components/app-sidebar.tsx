import { Show } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={48} height={48} />
          <span className="font-bold text-xl">VivaPro</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <Suspense>
          <Show when="signed-out">
            {data.navMain.map((item) => (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <Link href={item.url}>
                          <SidebarMenuButton>{item.title}</SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </Show>
        </Suspense>
        {/* todo: add array for signed in users*/}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
