import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import { QueryProvider } from "../components/providers/QueryProvider";
import { Toaster } from "../components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VivaPro - Invoices",
  description:
    "Manage customers, catalog products, and generate professional invoices in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <ClerkProvider>
          <QueryProvider>
            <SidebarProvider defaultOpen={false}>
              <AppSidebar className="md:hidden" />
              <SidebarInset>
                <header className="flex items-center gap-2 border-b px-4">
                  <SidebarTrigger className="md:hidden" />
                  <Navbar />
                </header>
                <main>{children}</main>
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
