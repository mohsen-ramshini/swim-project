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
import DropdownProfile from "../user/DropdownProfile";

const SwimAcademyCoursesURL = "https://www.swimacademy.ir/courses";

const NavBar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleRouting = (route: string, url: boolean) => {
    if (url) {
      window.open(route, "_blank");
    } else {
      router.push(`/${route}`);
    }
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
              <Button
                onClick={() => {
                  handleRouting("articles", false);
                  setIsMenuOpen(false);
                }}
                variant={"ghost"}
              >
                مقالات
              </Button>
              <Button
                onClick={() => {
                  handleRouting("books", false);
                  setIsMenuOpen(false);
                }}
                variant={"ghost"}
              >
                کتب و نشریات
              </Button>
              <Button
                onClick={() => {
                  handleRouting("news", false);
                  setIsMenuOpen(false);
                }}
                variant={"ghost"}
              >
                رویداد ها و اخبار
              </Button>
              <Button
                onClick={() => {
                  handleRouting(SwimAcademyCoursesURL, true);
                  setIsMenuOpen(false);
                }}
                variant={"ghost"}
              >
                دوره های آموزشی
              </Button>
              <Button
                onClick={() => {
                  handleRouting("articles", false);
                  setIsMenuOpen(false);
                }}
                variant={"ghost"}
              >
                مشاوره و سوالات علمی
              </Button>
              <Button
                onClick={() => {
                  handleRouting("about", false);
                  setIsMenuOpen(false);
                }}
                variant={"ghost"}
              >
                درباره ما
              </Button>
              <Button
                variant={"outline"}
                onClick={() => {
                  handleRouting("profile", false);
                  setIsMenuOpen(false);
                }}
              >
                ناحیه کاربری
              </Button>
              <Button
                variant={"secondary"}
                onClick={() => {
                  handleRouting("articles", false);
                  setIsMenuOpen(false);
                }}
                style={{ color: "white" }}
              >
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
            className="w-[130px] h-[50px] md:w-[200px] md:h-[70px] lg:w-[230px] lg:h-[80px]"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center justify-between max-w-xl absolute top-0 left-48 ">
        <NavigationMenu dir="rtl">
          <NavigationMenuList>
            <NavigationMenuItem
              className="pl-5"
              onClick={() => handleRouting("admin", false)}
            >
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                همکاران ما
              </div>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem onClick={() => handleRouting("admin", false)}>
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                اعضا
              </div>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem
              onClick={() => handleRouting("cooperation", false)}
            >
              <div className="group inline-flex h-9 w-max items-center justify-center px-2 py-2 text-sm font-small transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-black cursor-pointer">
                فراخوان همکاری
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem
              onClick={() => handleRouting("articles", false)}
            >
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

      <div
        className="absolute left-0 pl-4 md:pl-10 lg:pl-40 text-xl font-bold"
        dir="rtl"
      >
        <a href="tel:09032342677">
          <Button variant={"ghost"} size={"lg"}>
            <Phone
              style={{ width: 25, height: 25 }}
              className="inline md:hidden"
            />
            <span className="hidden md:inline md:text-xl">تماس بگیرید :</span>
            <span className="hidden md:inline md:text-xl">0903-234-2677</span>
          </Button>
        </a>
      </div>

      <div className="hidden lg:inline-flex  items-center justify-center  bg-slate-800 rounded-sm  top-32 absolute left-10 right-10">
        <NavigationMenu
          dir="rtl"
          className="flex justify-between p-5 min-w-full"
        >
          <NavigationMenuList>
            <NavigationMenuItem
              className="pl-5"
              onClick={() => handleRouting("articles", false)}
            >
              <NavigationMenuTrigger className="text-base lg:text-sm">
                مقالات
              </NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem onClick={() => handleRouting("books", false)}>
              <NavigationMenuTrigger className="text-base lg:text-sm">
                کتب و نشریات
              </NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem onClick={() => handleRouting("news", false)}>
              <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-base lg:text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
                رویدادها و اخبار
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem
              onClick={() => handleRouting(SwimAcademyCoursesURL, true)}
            >
              <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-base lg:text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
                دوره‌های آموزشی
              </div>
            </NavigationMenuItem>
            <NavigationMenuItem onClick={() => handleRouting("FAQ", false)}>
              <div className="group inline-flex h-9 w-max items-center justify-center px-4 py-2 text-base lg:text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 text-white cursor-pointer">
                مشاوره و سوالات علمی
              </div>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className="ml-0 list-none flex gap-2 h-full ">
            <NavigationMenuItem
              className="h-full relative top-2"
              onClick={() => handleRouting("about", false)}
            >
              <NavigationMenuTrigger className="text-base lg:text-sm  h-full">
                درباره ما
              </NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <div className="text-base lg:text-sm flex justify-center items-center bg-secondary p-2 rounded-lg">
                <DropdownProfile />
                <User color="white" size={20} />
              </div>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
          </div>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavBar;
