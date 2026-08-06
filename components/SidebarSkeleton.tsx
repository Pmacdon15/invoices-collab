import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function SidebarSkeleton() {
  return (
    <>
      {[1, 2, 3].map((groupId) => (
        <SidebarGroup key={groupId}>
          <SidebarGroupLabel>
            <Skeleton className="h-4 w-24" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[1, 2].map((itemId) => (
                <SidebarMenuItem key={itemId}>
                  <SidebarMenuButton disabled>
                    <Skeleton className="h-4 w-full max-w-[150px]" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
