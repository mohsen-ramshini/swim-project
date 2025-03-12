import React, { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { insertCreatorSchema } from "@/db/schema/article/creator";
import { Trash } from "lucide-react";
import { useGetCreators } from "@/features/creator/api/use-get-creators";

const formSchema = insertCreatorSchema
  .pick({
    id: true,
    name: true,
  })
  .extend({
    roles: z.array(z.string()).default([]), // اضافه کردن roles
  });

type FormValues = z.input<typeof formSchema> & {
  roles: string[]; // به‌عنوان آرایه‌ای از رشته‌ها
};

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const CreatorForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      id: 0,
      name: "",
      roles: [], // فیلد roles به‌عنوان آرایه‌ای از رشته‌ها
    },
  });

  const { data: categories, isLoading, isError } = useGetCreators();

  const [publishDate, setPublishDate] = useState<Date | null>(null);

  const handleFormSubmit = (values: FormValues) => {
    console.log(`form values${values}`);
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <div className="max-h-full flex justify-center items-center rtl overflow-y-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="p-8 bg-white rounded-lg shadow-lg max-w-5xl mx-auto space-y-6 w-full rtl mt-80 overflow-y-auto max-h-screen"
          style={{ maxHeight: "80vh", overflowY: "auto", direction: "rtl" }}
        >
          {/* name */}
          <div className="sm:w-1/3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="نام را وارد کنید"
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* roles */}
          <div className="sm:w-1/3">
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نقش‌ها</FormLabel>
                  <div className="flex flex-col space-y-2">
                    {["author", "editor", "translator"].map((role) => (
                      <FormControl key={role}>
                        <Label className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value.includes(role)}
                            onCheckedChange={(checked) => {
                              // اینجا در صورتی که checked true بود نقش به آرایه اضافه می‌شود و در غیر این صورت حذف می‌شود
                              field.onChange(
                                checked
                                  ? [...field.value, role]
                                  : field.value.filter((r) => r !== role)
                              );
                            }}
                            disabled={disabled}
                          />
                          <span>
                            {role === "author"
                              ? "نویسنده"
                              : role === "editor"
                              ? "ویراستار"
                              : "مترجم"}
                          </span>
                        </Label>
                      </FormControl>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full" disabled={disabled}>
            {id ? "ذخیره تغییرات" : "ایجاد کتاب"}
          </Button>

          {!!id && (
            <Button
              type="button"
              onClick={handleDelete}
              className="w-full mt-2"
              variant="outline"
              disabled={disabled}
            >
              <Trash className="size-4 mr-2" />
              حذف مقاله
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
