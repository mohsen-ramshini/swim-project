"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, X, User } from "lucide-react";

const NavBar = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const handleClick = () => {
    router.push("/admin");
    console.log("clicked");
  };

  return (
    <div className="relative h-40 w-full flex items-center justify-between px-4 bg-slate-50 ">
      {/* Mobile Hamburger Menu */}
      <div className="absolute right-4 lg:hidden">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="p-2 rounded-lg bg-gray-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="p-4">
            <h2 className="text-lg font-bold text-center">منو</h2>
            <div className="flex flex-col space-y-4 mt-4">
              <Button variant="link">مقالات</Button>
              <Button variant="link">کتب و نشریات</Button>
              <Button variant="link">رویداد ها و اخبار</Button>
              <Button variant="link">دوره های آموزشی</Button>
              <Button variant="link">مشاوره و سوالات علمی</Button>
              <Button variant="link">درباه ما</Button>
              <Button variant="link">ناحیه کاربری</Button>
              <Button variant="link" onClick={handleClick}>
                پنل ادمین
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* Logo - Centered on Mobile */}
      <div className="absolute  right-0 transform -translate-x-1/2 ">
        <Image
          src="/static/images/logo.png"
          alt="Logo"
          width={220}
          height={30}
        />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between max-w-xl absolute top-0 left-48 ">
        <NavigationMenu dir="rtl">
          <NavigationMenuList>
            <NavigationMenuItem className="pl-5">
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                همکاران ما
              </div>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                اعضا
              </div>
              <NavigationMenuContent></NavigationMenuContent>
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

      {/* Admin Panel Button - Visible on Desktop */}
      <Button
        onClick={handleClick}
        className="hidden lg:inline-flex absolute left-5"
      >
        پنل ادمین
      </Button>

      {/* Contact Info - Visible on Desktop */}
      <div
        className="hidden lg:inline-grid w-36 text-xl left-40 font-bold absolute"
        dir="rtl"
      >
        تماس بگیرید : <span dir="rtl">0903-234-2677</span>
      </div>
      <div className="hidden lg:inline-flex  items-center justify-center  bg-slate-800 rounded-sm  top-32 absolute left-10 right-10">
        <NavigationMenu
          dir="rtl"
          className="flex justify-between p-5 min-w-full"
        >
          <NavigationMenuList>
            <NavigationMenuItem className="pl-5 ">
              <NavigationMenuTrigger className="text-base lg:text-sm">
                مقالات
              </NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-base lg:text-sm">
                کتب و نشریات
              </NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-base lg:text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
                رویدادها و اخبار
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-base lg:text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
                دوره‌های آموزشی
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-base lg:text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
                مشاوره و سوالات علمی
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className="ml-0 list-none flex gap-2 h-full bg-slate-600">
            <NavigationMenuItem className="h-full">
              <NavigationMenuTrigger className="text-base lg:text-sm bg-black h-full">
                درباره ما
              </NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button className="text-base lg:text-sm">
                ناحیه کاربری
                <User />
              </Button>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
          </div>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavBar;
