import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import OrderSummery from "./OrderSummery";

const formSchema = z.object({
  onlinePayment: z.boolean().refine((val) => val, "پرداخت آنلاین الزامی است"),
  termsAccepted: z.boolean().refine((val) => val, "باید شرایط را بپذیرید"),
  privacyAccepted: z
    .boolean()
    .refine((val) => val, "باید سیاست حریم خصوصی را بپذیرید"),
});

type PaymentFormValues = z.infer<typeof formSchema>;

const PaymentAgreement = () => {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      onlinePayment: true,
      termsAccepted: false,
      privacyAccepted: false,
    },
  });

  const handleSubmit = (values: PaymentFormValues) => {
    console.log("Form submitted with values:", values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="p-6  rounded-lg  space-y-4 rtl h-full"
      >
        <FormField
          name="onlinePayment"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-row-reverse justify-start items-center space-x-2 rtl bg-secondary h-[100px] rtl text-right rounded-sm text-white p-5">
              <FormControl className="ml-5">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="flex flex-col items-end">
                <p className="text-xl font-semibold">آنلاین</p>
                <p>پرداخت اینترنتی کارت های عضو شتاب</p>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="termsAccepted"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-baseline  space-x-2 rtl">
              <FormLabel>توافقنامه را می‌پذیرم</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="privacyAccepted"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex items-baseline space-x-2 rtl">
              <FormLabel>سیاست حفظ حریم خصوصی را می‌پذیرم</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          ادامه
        </Button>
      </form>
    </Form>
  );
};

export default PaymentAgreement;
