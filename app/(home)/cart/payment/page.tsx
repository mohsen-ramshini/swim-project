"use client";
import React from "react";
import ShoppingStageBar from "../../components/cart/ShoppingStageBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PaymentAgreement from "../../components/cart/PaymentAgreement";
import OrderSummery from "../../components/cart/OrderSummery";

const page = () => {
  const router = useRouter();
  return (
    <section className="w-full h-full my-10 flex flex-col justify-center items-center">
      <div className="w-full h-full">
        <ShoppingStageBar activeStage={3} />
      </div>
      <div className="bg-yellow-400 w-full h-[800px]">
        <div className=" w-full h-full flex justify-center">
          <div className=" w-4/5 h-full flex flex-row-reverse ">
            <div className="h-full w-4/5  flex justify-center items-center">
              <div className="border-2 rounded-sm w-full h-full  flex flex-col justify-start items-center overflow-hidden">
                <h2 className=" text-4xl font-extrabold w-full text-center ">
                  پرداخت
                </h2>
                <div className="w-full">
                  <PaymentAgreement />
                </div>
                <div className="flex flex-col items-center overflow-auto">
                  <h5 className="my-5 text-xl">خلاصه سفارش شما</h5>
                  <div>
                    <OrderSummery />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full w-1/5 flex justify-end mr-5 max-h-[500px]">
              <div className=" w-full h-full flex justify-center items-center ">
                <div className="h-full w-full">
                  <div className="h-4/5 border-2 rounded-sm w-full  flex justify-center items-center ">
                    <div className="w-10/12 h-5/6  flex flex-col justify-center items-center">
                      <div className="w-full h-4/5 border-b-2 mb-1">
                        <p className="w-full h-1/4 text-right">جمع کل</p>
                        <p className="w-full h-1/4 text-center">price</p>
                        <p className="w-full h-1/4 text-right">تخفیف</p>
                        <p className="w-full h-1/4 text-center">0</p>
                      </div>
                      <div className="w-full h-1/5">
                        <p className="text-right">مبلغ قابل پرداخت</p>
                        <p className="text-center">price</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-1/5 w-full  flex justify-center items-end">
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
          </div>
        </div>
      </div>
      <div className="bg-green-500 w-full h-1/4">box3</div>
    </section>
  );
};

export default page;
