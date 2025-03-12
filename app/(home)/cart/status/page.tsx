"use client";
import React from "react";
import ShoppingStageBar from "@/components/cart/ShoppingStageBar";
import { Button } from "@/components/ui/button";
import { Check, CircleCheck, CircleX } from "lucide-react";
import { useRouter } from "next/navigation";
import OrderSummery from "@/components/cart/OrderSummery";
import HeroSection from "@/components/hero/HeroSection";

const page = () => {
  const router = useRouter();
  const success = false;
  return (
    <section className="w-full h-full  flex flex-col justify-center items-center">
      <HeroSection imageSourse={"banner-three.jpg"} width={1920} height={680} />
      <div className="hidden md:block w-full h-1/4">
        <ShoppingStageBar activeStage={4} />
      </div>
      <div className="w-4/5 h-3/4 flex flex-col justify-center items-center">
        <div className="flex flex-col w-full justify-center items-center my-10">
          <div className="rounded-full bg-secondary w-20 h-20 flex justify-center items-center mb-10">
            {success ? (
              <CircleCheck size={55} color="white" />
            ) : (
              <CircleX size={55} color="white" />
            )}
          </div>
          <h2 className=" text-2xl lg:text-4xl font-bold mb-10 text-center">
            {success ? (
              <p> پرداخت شما با موفقیت انجام شد</p>
            ) : (
              <p>پرداخت شما ناموفق بود</p>
            )}
          </h2>
          <p>کد رهگیری</p>
          <p>123456789856</p>
          <Button
            variant={"secondary"}
            className="text-white"
            onClick={() => router.push("/")}
          >
            بازگشت به صفحه اصلی
          </Button>
        </div>
        <div className="h-full flex flex-col justify-center items-center my-10">
          <h5 className="text-xl font-semibold">خلاصه خرید شما</h5>
          <OrderSummery />
        </div>
      </div>
    </section>
  );
};

export default page;
