"use client";
import React from "react";
import ShoppingStageBar from "../../../../components/cart/ShoppingStageBar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import AddressForm from "../../../../components/cart/AddressForm";

const page = () => {
  const router = useRouter();
  return (
    <section className="w-full h-screen my-10 flex flex-col justify-center items-center">
      <div className="w-full h-1/4">
        <ShoppingStageBar activeStage={2} />
      </div>
      <div className=" w-full h-2/4 flex justify-center">
        <div className=" w-4/5 h-full flex flex-row-reverse ">
          <div className="h-full w-4/5  flex justify-center items-center">
            <div className="border-2 rounded-sm w-full h-full flex flex-col justify-center items-center overflow-auto">
              <h2 className="relative bottom-10 text-4xl font-extrabold h-1/5 mt-24">
                ثبت نشانی
              </h2>
              <div className="h-full w-full">
                <AddressForm />
              </div>
            </div>
          </div>
          <div className="h-full w-1/5 flex justify-end mr-5 ">
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
      <div className="bg-green-500 w-full h-1/4">box3</div>
    </section>
  );
};

export default page;
