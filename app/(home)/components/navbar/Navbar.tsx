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
import { Menu, X, User, Phone } from "lucide-react";
import { DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();
  // const [isMounted, setIsMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // if (!isMounted) return null;

  const handleClick = () => {
    router.push("/admin");
    console.log("clicked");
  };

  return (
    <div className="relative h-20 lg:h-40 w-full flex items-center justify-between px-4 bg-slate-50 ">
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
            <DialogTitle></DialogTitle>
            <h2 className="text-lg font-bold text-center">منو</h2>
            <div className="flex flex-col space-y-4 mt-4">
              <Button variant="link">مقالات</Button>
              <Button variant="link">کتب و نشریات</Button>
              <Button variant="link">رویداد ها و اخبار</Button>
              <Button variant="link">دوره های آموزشی</Button>
              <Button variant="link">مشاوره و سوالات علمی</Button>
              <Button variant="link">درباره ما</Button>
              <Button variant={"outline"}>ناحیه کاربری</Button>
              <Button variant={"secondary"} onClick={handleClick}>
                پنل ادمین
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 md:left-auto md:right-0">
        <Link href={"/"}>
          <Image
            src="/static/images/logo.png"
            alt="Logo"
            width={220}
            height={30}
            className="w-[130px] h-[50px] md:w-[200px] md:h-[70px] lg:w-[250px] lg:h-[80px]"
          />
        </Link>
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

      <div
        className="absolute left-0 pl-4 md:pl-10 lg:pl-40 text-xl font-bold"
        dir="rtl"
      >
        <Button variant={"ghost"} size={"lg"}>
          <Phone
            style={{ width: 25, height: 25 }}
            className="inline md:hidden"
          />
          <span className="hidden md:inline md:text-xl">تماس بگیرید :</span>
          <span className="hidden md:inline md:text-xl">0903-234-2677</span>
        </Button>
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
          <div className="ml-0 list-none flex gap-2 h-full ">
            <NavigationMenuItem className="h-full">
              <NavigationMenuTrigger className="text-base lg:text-sm  h-full">
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
