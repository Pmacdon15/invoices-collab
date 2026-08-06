import UserNavbar from "@/components/shared/user-navbar";
import { UserSidebar } from "@/components/shared/user-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SidebarProvider defaultOpen={false}>
        <UserSidebar className="md:hidden" />
        <SidebarInset>
          <header className="flex items-center gap-2 border-b px-4">
            <SidebarTrigger className="md:hidden" />
            <UserNavbar />
          </header>
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
