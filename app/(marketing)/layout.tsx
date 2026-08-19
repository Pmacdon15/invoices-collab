import MarketingNavbar from "@/components/shared/marketing-navbar";
import { MarketingSidebar } from "@/components/shared/marketing-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <MarketingSidebar className="md:hidden" />
        <SidebarInset>
          <header className="flex items-center gap-2 border-b px-4">
            <SidebarTrigger className="md:hidden" />
            <MarketingNavbar />
          </header>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
