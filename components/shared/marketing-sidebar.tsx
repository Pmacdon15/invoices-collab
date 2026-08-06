"use client";

import Image from "next/image";
import Link from "next/link";
import type * as React from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";

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

export function MarketingSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.webp" alt="logo" width={48} height={48} />
          <span className="font-bold text-xl">VivaPro</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
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
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
