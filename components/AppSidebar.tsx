"use client";
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppContext } from "@/providers/Appcontext";

// head item
const headItem = {
  title: "Article",
  url: "#",
  icon: Home,
};

export function AppSidebar() {
  const { setActivePage } = useAppContext();

  // Menu items
  const subItems = [
    {
      title: "Article",
      setActive: () => setActivePage("article"),
      icon: Inbox,
    },
    {
      title: "Article Categories",
      setActive: () => setActivePage("articleCategory"),
      icon: Inbox,
    },
    {
      title: "Article Comment",
      setActive: () => setActivePage("ArticleComment"),
      icon: Calendar,
    },
    {
      title: "Article Tag",
      setActive: () => setActivePage("articleTag"),
      icon: Search,
    },
    {
      title: "Author",
      setActive: () => setActivePage("author"),
      icon: Settings,
    },
    {
      title: "Editor",
      setActive: () => setActivePage("editor"),
      icon: Server,
    },
    {
      title: "Translator",
      setActive: () => setActivePage("translator"),
      icon: IndentDecrease,
    },
  ];

  return (
    <Sidebar side="left" dir="rtl" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton asChild>
                      <a href={headItem.url}>
                        <headItem.icon />
                        <span>{headItem.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {subItems.map((item) => (
                      <DropdownMenuItem key={item.title} dir="rtl" asChild>
                        <a onClick={item.setActive}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
