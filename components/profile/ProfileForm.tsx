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
import { Edit, User } from "lucide-react";

// ✅ Updated Zod Schema (Required & Optional Fields)
const formSchema = z.object({
  firstName: z.string().min(2, "نام الزامی است و باید حداقل ۲ کاراکتر باشد"),
  lastName: z
    .string()
    .min(2, "نام خانوادگی الزامی است و باید حداقل ۲ کاراکتر باشد"),
  phone: z.string().min(10, "شماره تماس الزامی است و باید حداقل ۱۰ رقم باشد"),
  email: z.string().email("ایمیل معتبر وارد کنید").optional(),
  postalCode: z.string().optional(),
  province: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
});

interface Props {
  onSubmit: (values: any) => void;
}

export const ProfileForm: React.FC<Props> = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      postalCode: "",
      province: "",
      city: "",
      address: "",
    },
  });

  return (
    <div className="flex flex-col lg:flex-row-reverse justify-center items-center min-h-screen p-4">
      {/* Profile Section */}
      <div className="w-full lg:w-1/3 flex flex-col items-center p-4">
        <div className="h-40 w-40 bg-secondary rounded-lg flex justify-center items-center">
          <User size={100} color="white" />
        </div>
        <div className="flex flex-row-reverse text-center mt-4">
          <p className="text-2xl font-bold flex items-center gap-2">
            ویرایش <Edit />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "firstName", label: "نام", required: true },
              { name: "lastName", label: "نام خانوادگی", required: true },
              { name: "phone", label: "شماره تماس", required: true },
              { name: "email", label: "آدرس ایمیل", required: false },
              { name: "postalCode", label: "کد پستی", required: false },
              { name: "province", label: "استان", required: false },
              { name: "city", label: "شهر", required: false },
              { name: "address", label: "آدرس", required: false },
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
              ذخیره اطلاعات
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
