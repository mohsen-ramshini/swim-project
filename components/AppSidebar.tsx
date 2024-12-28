import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Server,
  IndentDecrease,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Article",
    url: "#",
    icon: Home,
  },
  {
    title: "Article Categories",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Article Comment",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Article Tag",
    url: "#",
    icon: Search,
  },
  {
    title: "Author",
    url: "#",
    icon: Settings,
  },
  {
    title: "Editor",
    url: "#",
    icon: Server,
  },
  {
    title: "Traslator",
    url: "#",
    icon: IndentDecrease,
  },
];

export function AppSidebar() {
  return (
    <Sidebar side="right" dir="rtl" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
