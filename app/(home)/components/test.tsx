"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { User } from "lucide-react";

const NavBar = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleClick = () => {
    router.push("/admin");
    console.log("clicked");
  };

  return (
    <div className="relative h-36 flex items-center justify-between p-4 bg-slate-50">
      <div className=" absolute top-0 left-48">
        <NavigationMenu dir="rtl">
          <NavigationMenuList>
            <NavigationMenuItem className="pl-5">
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                همکاران ما
              </div>
              <NavigationMenuContent>
                {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                اعضا
              </div>
              <NavigationMenuContent>
                {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                فراخوان همکاری
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                بلاگ
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                تماس با ما
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Button onClick={handleClick}>پنل ادمین</Button>
      <div
        className="inline-grid w-36 absolute text-xl left-40 font-bold"
        dir="rtl"
      >
        تماس بگیرید : <span dir="rtl">0903-234-2677</span>
      </div>
      <div className="relative flex items-end justify-start p-4 bg-slate-800 rounded-sm w-full top-16">
        <NavigationMenu dir="rtl">
          <NavigationMenuList className="flex space-x-4  w-full relative -right-3/4">
            <NavigationMenuItem className="pl-5">
              <NavigationMenuTrigger>مقالات</NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>کتب و نشریات</NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
                رویدادها و اخبار
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
                دوره‌های آموزشی
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
                مشاوره و سوالات علمی
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className="ml-0 list-none flex gap-2">
            <NavigationMenuItem>
              <NavigationMenuTrigger>درباره ما</NavigationMenuTrigger>
              <NavigationMenuContent>
                {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button>
                ناحیه کاربری
                <User />
              </Button>
              <NavigationMenuContent>
                {/* <NavigationMenuLink>Link</NavigationMenuLink> */}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </div>
        </NavigationMenu>
      </div>
      <div className="ml-0">
        <Image
          src="/static/images/logo.png"
          alt="Logo"
          width={220}
          height={30}
        />
      </div>
    </div>
  );
};

export default NavBar;
