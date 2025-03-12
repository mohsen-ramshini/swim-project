"use client";
import React from "react";
import ShoppingStageBar from "../../../../components/cart/ShoppingStageBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PaymentAgreement from "../../../../components/cart/PaymentAgreement";
import OrderSummery from "../../../../components/cart/OrderSummery";
import HeroSection from "@/components/hero/HeroSection";

const Page = () => {
  const router = useRouter();

  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      {/* هدر و بنر */}
      <HeroSection imageSourse={"banner-three.jpg"} width={1920} height={680} />

      {/* نوار مراحل خرید */}
      <div className="hidden md:block w-full h-1/4">
        <ShoppingStageBar activeStage={3} />
      </div>

      {/* محتوای اصلی */}
      <div className="w-full h-auto my-10 px-4">
        <div className="w-full flex flex-col lg:flex-row-reverse justify-center items-center lg:items-start lg:w-4/5 mx-auto gap-6">
          {/* بخش پرداخت */}
          <div className="w-full lg:w-3/5 bg-white border-2 rounded-md shadow-sm p-6">
            <h2 className="text-3xl font-extrabold text-center mb-6">پرداخت</h2>
            <PaymentAgreement />
            <div className="mt-6">
              <h5 className="text-xl font-bold text-center mb-4">
                خلاصه سفارش شما
              </h5>
              <div className="h-[300px] overflow-y-auto">
                <OrderSummery />
              </div>
            </div>
          </div>

          {/* بخش قیمت و دکمه پرداخت */}
          <div className="w-full lg:w-2/5 max-w-md">
            <div className="bg-white border-2 rounded-md shadow-sm p-6 flex flex-col justify-between h-full">
              <div>
                <div className="border-b-2 pb-4 mb-4">
                  <p className="flex justify-between">
                    <span>جمع کل:</span>{" "}
                    <span className="font-bold">price</span>
                  </p>
                  <p className="flex justify-between">
                    <span>تخفیف:</span> <span className="font-bold">0</span>
                  </p>
                </div>
                <p className="flex justify-between text-lg font-bold">
                  <span>مبلغ قابل پرداخت:</span> <span>price</span>
                </p>
              </div>
              <Button
                className="w-full mt-6 lg:mt-10"
                onClick={() => router.push("/cart/status")}
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
