"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Cookies from "js-cookie"; // ✅ اضافه‌شده برای مدیریت کوکی

const DropdownProfile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("خطا در خروج:", error.message);
      toast.error("خطا در خروج")
    } else {
      Cookies.remove("role"); // ✅ حذف کوکی نقش
      toast.success("کاربر خارج شد")
      router.push("/sign-in");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer text-white hover:text-gray-200">
          <CircleUserRound className="w-5 h-5" />
          <span className="text-sm font-medium">ناحیه کاربری</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 rtl">
        <DropdownMenuLabel className="flex justify-between">
          <CircleUserRound />
          <p>محسن رامشینی</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col w-full">
          <DropdownMenuItem
            className="w-full justify-end cursor-pointer"
            onClick={() => router.push("/profile")}
          >
            پروفایل من
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full justify-end cursor-pointer"
            onClick={() => router.push("/cart")}
          >
            سبد خرید
          </DropdownMenuItem>
          <DropdownMenuItem
            className="w-full justify-end cursor-pointer"
            onClick={() => router.push("/change-password")}
          >
            تغییر کلمه عبور
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-center cursor-pointer text-red-600 hover:text-red-800"
          onClick={handleLogout}
        >
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownProfile;
