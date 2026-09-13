"use client";

import { OrganizationSwitcher, useClerk } from "@clerk/nextjs";
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
      title: "Dashboard",
      url: "#",
      items: [
        {
          title: "Clients",
          url: "/clients",
        },
        {
          title: "Products",
          url: "/products",
        },
        {
          title: "Invoices",
          url: "/invoices",
        },
      ],
    },
  ],
};

export function UserSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const isMobile = useIsMobile();
  const { openUserProfile, openOrganizationProfile, signOut } = useClerk();

  if (!isMobile) return null;

  return (
    <Sidebar {...props}>
      <SidebarHeader className="gap-3 p-4">
        <Link href={"/"} className="flex items-center gap-2">
          <Image src="/logo.webp" alt="logo" width={40} height={40} />
          <span className="font-bold text-xl">VivaPro</span>
        </Link>
        <div className="pt-2">
          <OrganizationSwitcher
            hidePersonal={false}
            afterCreateOrganizationUrl="/invoices"
            afterSelectOrganizationUrl="/invoices"
            afterLeaveOrganizationUrl="/invoices"
            appearance={{
              elements: {
                rootBox: "w-full flex",
                organizationSwitcherTrigger:
                  "w-full justify-between px-3 py-2 rounded-md border border-input bg-background hover:bg-accent text-sm font-medium transition-colors shadow-xs",
              },
            }}
          />
        </div>
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
                      <SidebarMenuButton size={"lg"}>
                        {item.title}
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupLabel>Account & Organization</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size={"lg"}
                  onClick={() => openOrganizationProfile()}
                >
                  Organization Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size={"lg"}
                  onClick={() => openUserProfile()}
                >
                  User Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton size={"lg"} onClick={() => signOut()}>
                  Sign out
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
