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

  const handleClick = () => {
    router.push("/");
  };
  return (
    <div className="relative flex items-center justify-between p-4">
      <NavigationMenu dir="rtl">
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <NavigationMenuTrigger>آیتم اول</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>آیتم دوم</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>آیتم سوم</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
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
