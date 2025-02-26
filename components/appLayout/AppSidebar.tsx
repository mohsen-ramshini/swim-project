"use client";
import {
  MessageCircle,
  Newspaper,
  Inbox,
  BookPlus,
  Tag,
  BookType,
  FilePenLine,
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
  title: "مقالات",
  url: "#",
  icon: Newspaper,
};

export function AppSidebar() {
  const { setActivePage } = useAppContext();

  // Menu items
  const subItems = [
    {
      title: "مقالات",
      setActive: () => setActivePage("article"),
      icon: BookPlus,
    },
    {
      title: "دسته بندی مقالات",
      setActive: () => setActivePage("articleCategory"),
      icon: Inbox,
    },
    {
      title: "نظرات",
      setActive: () => setActivePage("ArticleComment"),
      icon: MessageCircle,
    },
    {
      title: "تگ ها",
      setActive: () => setActivePage("articleTag"),
      icon: Tag,
    },
    {
      title: "نویسنده",
      setActive: () => setActivePage("author"),
      icon: BookType,
    },
    {
      title: "ویرایش گر",
      setActive: () => setActivePage("editor"),
      icon: FilePenLine,
    },
    {
      title: "مترجم",
      setActive: () => setActivePage("translator"),
      icon: BookType,
    },
  ];

  return (
    <Sidebar side="right" dir="rtl" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>فهرست</SidebarGroupLabel>
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
