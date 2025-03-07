"use client";
import {
  MessageCircle,
  Newspaper,
  Inbox,
  BookPlus,
  Tag,
  BookType,
  FilePenLine,
  BookOpen,
  FolderOpen,
  Radio,
  FileText,
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

export function AppSidebar() {
  const { setActivePage } = useAppContext();

  // Head items
  const headItems = [
    {
      title: "مقالات",
      url: "#",
      icon: Newspaper,
      subItems: [
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
      ],
    },
    {
      title: "کتاب‌ها",
      url: "#",
      icon: BookOpen,
      subItems: [
        {
          title: "افزودن کتاب",
          setActive: () => setActivePage("book"),
          icon: BookPlus,
        },
        {
          title: "دسته بندی کتاب‌ها",
          setActive: () => setActivePage("bookCategory"),
          icon: FolderOpen,
        },
      ],
    },
    {
      title: "اخبار",
      url: "#",
      icon: Radio,
      subItems: [
        {
          title: "افزودن اخبار",
          setActive: () => setActivePage("news"),
          icon: FileText,
        },
        {
          title: "دسته بندی اخبار",
          setActive: () => setActivePage("newsCategory"),
          icon: FolderOpen,
        },
      ],
    },
  ];

  return (
    <Sidebar side="right" dir="rtl" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>فهرست</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {headItems.map((headItem) => (
                <SidebarMenuItem key={headItem.title}>
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
                      {headItem.subItems.map((item) => (
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
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
