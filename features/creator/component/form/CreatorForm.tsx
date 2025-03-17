import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Trash } from "lucide-react";
import { useGetCreators } from "@/features/creator/api/use-get-creators";

// API expects a schema like this:
const formSchema = z.object({
  name: z.string().min(1, "Name is required"), // name field
  author: z.boolean().optional(), // optional checkbox for author
  editor: z.boolean().optional(), // optional checkbox for editor
  translator: z.boolean().optional(), // optional checkbox for translator
});

type FormValues = z.input<typeof formSchema>;

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
      name: "",
      author: false,
      editor: false,
      translator: false,
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    // Add roles directly from checkboxes
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

          {/* roles (checkboxes for author, editor, translator) */}
          <div className="sm:w-1/3">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نویسنده</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:w-1/3">
            <FormField
              control={form.control}
              name="editor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ویراستار</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="sm:w-1/3">
            <FormField
              control={form.control}
              name="translator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مترجم</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button className="w-full" disabled={disabled}>
            {id ? "ذخیره تغییرات" : "ایجاد کتاب"}
          </Button>

          {/* Delete Button (only visible if id exists) */}
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
