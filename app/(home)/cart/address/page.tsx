"use client";
import React from "react";
import ShoppingStageBar from "../../../../components/cart/ShoppingStageBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AddressForm from "../../../../components/cart/AddressForm";
import HeroSection from "@/components/hero/HeroSection";

const Page = () => {
  const router = useRouter();

  return (
    <section className="w-full flex flex-col items-center">
      {/* بخش بنر */}
      <HeroSection imageSourse={"banner-three.jpg"} width={1920} height={680} />

      {/* نوار مراحل خرید */}
      <div className="hidden md:block w-full h-1/4">
        <ShoppingStageBar activeStage={2} />
      </div>

      {/* فرم آدرس و سبد خرید */}
      <div className="w-full md:w-4/5 flex flex-col md:flex-row-reverse justify-center  my-10 ">
        {/* فرم ثبت نشانی */}
        <div className="w-full md:w-4/5 flex mb-6 justify-center md:mb-0 ">
          <div className="border-2 rounded-sm w-full md:w-4/5 flex flex-col justify-center items-center p-6">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              ثبت نشانی
            </h2>
            <div className="w-full">
              <AddressForm />
            </div>
          </div>
        </div>

        {/* بخش خلاصه پرداخت */}
        <div className="w-full md:w-1/5 flex  order-last md:order-none">
          <div className="w-full flex flex-col items-center">
            <div className="border-2 rounded-sm w-full p-4">
              <div className="w-full border-b-2 pb-3 mb-3">
                <p className="text-right">جمع کل</p>
                <p className="text-center font-bold">price</p>
                <p className="text-right mt-2">تخفیف</p>
                <p className="text-center">0</p>
              </div>
              <div className="w-full">
                <p className="text-right">مبلغ قابل پرداخت</p>
                <p className="text-center font-bold">price</p>
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-4">
              <Button
                className="w-full"
                onClick={() => router.push("/cart/payment")}
              >
                ادامه ثبت سفارش
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
