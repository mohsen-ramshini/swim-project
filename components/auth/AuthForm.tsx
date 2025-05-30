"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" })
    .max(15, { message: "شماره تلفن نمی‌تواند بیش از ۱۵ رقم باشد" })
    .regex(/^(\+98|0)?9\d{9}$/, { message: "شماره تلفن نامعتبر است" }),
  password: z.string().min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

const signUpSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" })
      .max(15, { message: "شماره تلفن نمی‌تواند بیش از ۱۵ رقم باشد" })
      .regex(/^(\+98|0)?9\d{9}$/, { message: "شماره تلفن نامعتبر است" }),
    password: z.string().min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
    confirmPassword: z
      .string()
      .min(6, { message: "تأیید رمز عبور باید حداقل ۶ کاراکتر باشد" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "رمز عبور و تأیید رمز عبور مطابقت ندارند",
        code: "custom",
      });
    }
  });

type AuthFormValues = {
  phoneNumber: string;
  password: string;
  confirmPassword?: string;
};

type AuthFormProps = {
  onSubmit: (values: AuthFormValues) => void;
  isLogin: boolean;
};

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLogin }) => {
  const router = useRouter();
  const formSchema = isLogin ? loginSchema : signUpSchema;

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  // state برای نمایش/مخفی کردن رمز عبور
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8 mt-12 text-right direction-rtl">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-primary dark:text-white">
          {isLogin ? "ورود به حساب کاربری" : "ایجاد حساب کاربری"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {`برای ${isLogin ? "ورود" : "ثبت‌نام"} شماره موبایل و رمز عبور خود را وارد کنید.`}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  شماره موبایل
                </FormLabel>
                <FormControl>
                  <Input
                    dir="rtl"
                    className="text-right"
                    type="text"
                    placeholder="مثال: 09123456789"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  رمز عبور
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      dir="rtl"
                      className="text-right pr-10"
                      type={showPassword ? "text" : "password"}
                      placeholder="رمز عبور خود را وارد کنید"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-2 flex items-center px-2 text-gray-600 dark:text-gray-400"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-sm mt-1" />
              </FormItem>
            )}
          />

          {!isLogin && (
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    تأیید رمز عبور
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        dir="rtl"
                        className="text-right pr-10"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="رمز عبور را دوباره وارد کنید"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 left-2 flex items-center px-2 text-gray-600 dark:text-gray-400"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm mt-1" />
                </FormItem>
              )}
            />
          )}

          {isLogin && (
            <Link
              href="/forget-password"
              className="block text-sm text-blue-600 dark:text-blue-400 text-right hover:underline"
            >
              رمز عبور را فراموش کرده‌اید؟
            </Link>
          )}

          <Button type="submit" className="w-full mt-2 bg-primary hover:bg-primary/90">
            {isLogin ? "ورود" : "ثبت‌نام"}
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full text-sm text-gray-600 dark:text-gray-400 hover:underline"
            onClick={() => router.push(isLogin ? "/sign-up" : "/sign-in")}
          >
            {isLogin ? "حساب ندارید؟ ثبت‌نام کنید" : "قبلاً حساب دارید؟ ورود"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
