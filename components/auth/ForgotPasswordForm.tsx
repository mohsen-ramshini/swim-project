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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Lock, Phone } from "lucide-react";
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
  const [codeSent, setCodeSent] = useState(true); // اصلاح مقدار اولیه

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      phoneNumber: "",
      verificationCode: "",
    },
  });

  const onSubmit = async (values: {
    phoneNumber: string;
    verificationCode?: string;
  }) => {
    try {
      const response = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      // فرض بر این است که بعد از ارسال موفق، کد فعال می‌شود
      if (!codeSent) setCodeSent(true);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  return (
<div
  className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 space-y-6"
  dir="rtl"
>
  <div className="text-center space-y-3">
    <h1 className="text-2xl font-bold text-[#172b79]">بازیابی رمز عبور</h1>
    <Lock size={32} className="mx-auto text-[#172b79]" />
  </div>

  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-5 text-right"
      dir="rtl"
    >
      {!codeSent && (
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                شماره همراه <Phone size={18} />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="مثال: 09123456789"
                  {...field}
                  className="text-right"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {codeSent && (
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>کد تایید ارسال‌شده</FormLabel>
              <FormControl>
                <div className="flex justify-center">
                  <InputOTP maxLength={6} onChange={field.onChange}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <Button type="submit" className="w-full bg-[#172b79] text-white">
        {codeSent ? "تایید کد" : "ارسال کد بازیابی"}
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-full text-[#172b79] hover:underline"
        onClick={() => router.push("/sign-in")}
      >
        بازگشت به صفحه ورود
      </Button>
    </form>
  </Form>
</div>

  );
};
