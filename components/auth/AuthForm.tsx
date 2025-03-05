"use client";
import React from "react";
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
import { Lock, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" })
    .max(15, { message: "شماره تلفن نمی‌تواند بیش از ۱۵ رقم باشد" })
    .regex(/^(\+98|0)?9\d{9}$/, { message: "شماره تلفن نامعتبر است" }),
  password: z
    .string()
    .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
});

const signUpSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(10, { message: "شماره تلفن باید حداقل ۱۰ رقم باشد" })
      .max(15, { message: "شماره تلفن نمی‌تواند بیش از ۱۵ رقم باشد" })
      .regex(/^(\+98|0)?9\d{9}$/, { message: "شماره تلفن نامعتبر است" }),
    password: z
      .string()
      .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد" }),
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
      confirmPassword: "", // فقط در ثبت‌نام نیاز است
    },
  });

  return (
    <div className="w-full lg:w-4/5 h-4/5 mt-10 shadow-lg p-5">
      <div className="w-full h-2/5 flex flex-col justify-center items-center">
        <h1 className=" text-4xl xl:text-5xl font-extrabold py-10 text-white">
          انجمن شنای ایران
        </h1>
        <Image
          src={"/static/images/logo.png"}
          alt="logo"
          width={300}
          height={100}
        />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-around items-center w-full h-3/5"
        >
          <div className="w-full flex flex-col justify-center text-right">
            {/* phoneNumber */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="text-right rtl py-5">
                  <FormLabel className="text-lg lg:text-2xl text-white">
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

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg lg:text-2xl text-white">
                    رمز عبور
                    <Lock size={35} className="inline pl-2" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="رمز عبور خود را وارد کنید"
                      {...field}
                      style={{ direction: "rtl" }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password (only for sign-up) */}
            {!isLogin && (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="py-5">
                    <FormLabel className="text-2xl text-white">
                      تأیید رمز عبور
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="رمز عبور خود را تأیید کنید"
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

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#172b79]">
            {isLogin ? "ورود" : "ثبت نام"}
          </Button>

          {/* Toggle between login and signup */}
          <Button
            type="button"
            className="w-full mt-2"
            variant="ghost"
            onClick={() => router.push(isLogin ? "/sign-up" : "/sign-in")}
          >
            {isLogin ? "حساب کاربری ندارید؟ ثبت نام کنید" : "به ورود بروید"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
