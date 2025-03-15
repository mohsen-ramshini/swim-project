"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const forgotPasswordSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" })
    .max(15, { message: "شماره تلفن نمی‌تواند بیش از ۱۵ رقم باشد" })
    .regex(/^\+98|0?9\d{9}$/, { message: "شماره تلفن نامعتبر است" }),
  verificationCode: z.string().optional(),
});

export const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();

  const [codeSent, setCodeSent] = useState(false);

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { phoneNumber: "", verificationCode: "" },
  });

  const onSubmit = async (values: {
    phoneNumber: string;
    verificationCode?: string;
  }) => {
    console.log("Submitted values:", values);

    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log("Response:", data);
      setCodeSent(true);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
    <div className="w-full lg:w-4/5 h-4/5 mt-10 shadow-lg p-5 bg-white rounded-lg">
      <div className="w-full h-2/5 flex flex-col justify-center items-center">
        <Image
          src={"/static/images/logo.png"}
          alt="logo"
          className="max-w-[150px] max-h-[50px] sm:max-w-[250px] sm:max-h-[90px] md:max-w-[300px] md:max-h-[100px]"
          width={300}
          height={100}
        />
        <h1 className="text-xl xl:text-3xl font-extrabold py-1 mb-10 text-center">
          بازیابی رمز عبور
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-around items-center w-full h-3/5"
        >
          <div className="w-full flex flex-col justify-center text-right">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="text-right rtl py-5">
                  <FormLabel className="text-lg lg:text-2xl">
                    شماره همراه
                    <Phone size={35} className="inline pl-2" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="شماره همراه خود را وارد کنید"
                      {...field}
                      style={{ direction: "rtl" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {codeSent && (
              <FormField
                control={form.control}
                name="verificationCode"
                render={({ field }) => (
                  <FormItem className="text-right rtl py-5">
                    <FormLabel className="text-lg lg:text-2xl">
                      کد تایید
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="کد تایید را وارد کنید"
                        {...field}
                        style={{ direction: "rtl" }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <Button type="submit" className="w-full bg-[#172b79]">
            {codeSent ? "تایید کد" : "ارسال کد بازیابی"}
          </Button>

          <Button
            type="button"
            className="w-full mt-2"
            variant="ghost"
            onClick={() => router.push("/sign-in")}
          >
            بازگشت به صفحه ورود
          </Button>
        </form>
      </Form>
    </div>
  );
};
