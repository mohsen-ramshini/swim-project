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
import { Lock } from "lucide-react";

// ✅ Updated Zod Schema for Password Change Form
const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "کلمه عبور فعلی باید حداقل ۶ کاراکتر باشد"),
    newPassword: z.string().min(6, "کلمه عبور جدید باید حداقل ۶ کاراکتر باشد"),
    confirmPassword: z
      .string()
      .min(6, "تکرار کلمه عبور جدید باید حداقل ۶ کاراکتر باشد"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "کلمه عبور جدید و تکرار آن باید یکسان باشند",
    path: ["confirmPassword"],
  });

interface Props {
  onSubmit: (values: any) => void;
}

export const ChangePasswordForm: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="flex flex-col lg:flex-row-reverse justify-center items-center min-h-screen p-4 ">
      {/* Profile Section */}
      <div className="w-full lg:w-1/3 flex flex-col items-center p-4">
        <div className="h-40 w-40 bg-secondary rounded-lg flex justify-center items-center">
          <Lock size={100} color="white" />
        </div>
        <div className="flex flex-row-reverse text-center mt-4">
          <p className="text-2xl font-bold flex items-center gap-2">
            تغییر کلمه عبور
          </p>
        </div>
      </div>

      {/* Form Section */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg w-full max-w-3xl"
          dir="rtl"
        >
          <div className="grid grid-cols-1 gap-4">
            {[
              {
                name: "currentPassword",
                label: "کلمه عبور فعلی",
                required: true,
              },
              { name: "newPassword", label: "کلمه عبور جدید", required: true },
              {
                name: "confirmPassword",
                label: "تکرار کلمه عبور جدید",
                required: true,
              },
            ].map(({ name, label, required }) => (
              <FormField
                key={name}
                control={form.control}
                name={name as keyof z.infer<typeof formSchema>}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-right">
                      {label}{" "}
                      {required && <span className="text-red-500">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="w-full text-right"
                        placeholder={`${label} را وارد کنید`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Button className="w-full sm:w-1/2 bg-secondary" type="submit">
              تغییر کلمه عبور
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
