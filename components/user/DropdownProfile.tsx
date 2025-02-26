import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";

const DropdownProfile = () => {
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="text-white">
            ناحیه کاربری
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 rtl">
          <DropdownMenuLabel className="flex justify-between">
            <CircleUserRound />
            <p>محسن رامشینی</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex flex-col  w-full">
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
          <DropdownMenuItem className="flex justify-center cursor-pointer">
            خروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default DropdownProfile;
