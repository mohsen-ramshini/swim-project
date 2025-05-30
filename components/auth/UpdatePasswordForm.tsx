"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Eye, EyeOff, Lock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import clsx from "clsx";

const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد")
      .max(64, "رمز عبور نباید بیش از ۶۴ کاراکتر باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن باید یکسان باشند",
    path: ["confirmPassword"],
  });

type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

const UpdatePasswordPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (!access_token) {
      toast.error("توکن تغییر رمز عبور یافت نشد.");
      return;
    }

    setAccessToken(access_token);
    setRefreshToken(refresh_token);
  }, []);

  const onSubmit = async (data: UpdatePasswordFormData) => {
    if (!accessToken) {
      toast.error("توکن معتبر نیست");
      return;
    }

    setLoading(true);

    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || "",
    });

    if (sessionError) {
      toast.error("خطا در احراز هویت");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      toast.error("خطا در به‌روزرسانی رمز عبور");
    } else {
      toast.success("رمز عبور با موفقیت به‌روزرسانی شد.");
      setTimeout(() => {
        router.push("/sign-in");
      }, 2000);
    }

    setLoading(false);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 py-10" dir="rtl">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6">
          <Lock size={40} className="mx-auto text-[#172b79]" />
          <h1 className="text-3xl font-extrabold text-[#172b79]">تغییر رمز عبور</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-right" dir="rtl">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رمز عبور جدید</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="رمز عبور جدید"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تکرار رمز عبور جدید</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="تکرار رمز عبور جدید"
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full mt-2 bg-blue-500 hover:bg-blue-600" disabled={loading}>
              {loading ? "در حال ارسال..." : "تغییر رمز عبور"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default UpdatePasswordPage;
