import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";

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
            <div className="flex min-h-screen flex-col bg-background">
              <header className="flex h-16 items-center gap-2 border-b px-4 md:px-8">
                <AppSidebar className="md:hidden" />
                <Navbar />
              </header>
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
