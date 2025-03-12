"use client";
import React from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const handleRouting = (route: string, url: boolean) => {
    if (url) {
      window.open(route, "_blank");
    } else {
      router.push(route.startsWith("/") ? route : `/${route}`);
    }
  };

  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="relative w-full flex items-center justify-between p-4">
      <NavigationMenu dir="rtl">
        <NavigationMenuList className="flex  justify-center">
          <NavigationMenuItem
            style={{ backgroundColor: "black", borderRadius: 5, marginLeft: 5 }}
            onClick={() => handleRouting("/articles", false)}
          >
            <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-base lg:text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
              مقالات
            </div>
          </NavigationMenuItem>
          <NavigationMenuItem
            onClick={() => handleRouting("/books", false)}
            style={{ backgroundColor: "black", borderRadius: 5 }}
          >
            <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-base lg:text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
              کتاب ها
            </div>
          </NavigationMenuItem>
          <NavigationMenuItem
            onClick={() => handleRouting("/news", false)}
            style={{ backgroundColor: "black", borderRadius: 5 }}
          >
            <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-base lg:text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
              اخبار
            </div>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button onClick={handleClick}>
              صفحه اصلی
              <Home />
            </Button>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="ml-0">
        <Image
          src="/static/images/logo.png"
          alt="Logo"
          width={120}
          height={30}
        />
      </div>
    </div>
  );
};

export default NavBar;
