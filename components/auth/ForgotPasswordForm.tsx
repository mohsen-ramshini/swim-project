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
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "ایمیل معتبر نیست" }),
});

interface Props {
  onSubmit?: (values: { email: string }) => void;
}

export const ForgotPasswordForm: React.FC<Props> = ({ onSubmit }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const form = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const sendRecoveryEmail = async (email: string) => {
    setLoading(true);
    setMessage("");
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast.error("خطا در ارسال لینک بازیابی")
    } else {
      toast.success("لینک بازیابی رمز عبور به ایمیل شما ارسال شد. لطفاً ایمیل خود را بررسی کنید.")

      setCodeSent(true);
    }
    setLoading(false);
  };

  const onSubmitHandler = async (values: { email: string }) => {
    await sendRecoveryEmail(values.email);
    onSubmit && onSubmit(values);
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
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="space-y-5 text-right"
          dir="rtl"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  ایمیل <Mail size={18} />
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    className="text-left"
                    type="email"
                    autoComplete="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#172b79] text-white"
            disabled={loading}
          >
            {loading ? "در حال ارسال..." : codeSent ? "ارسال مجدد لینک" : "ارسال لینک بازیابی"}
          </Button>

          {message && (
            <p className="text-center text-sm text-red-600 dark:text-red-400">
              {message}
            </p>
          )}

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
