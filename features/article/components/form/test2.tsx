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
import { Trash } from "lucide-react";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from "ckeditor5";
import { insertArticleSchema } from "@/db/schema/article/article";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzgxOTUxOTksImp0aSI6IjhiZDk3MmYxLWM2ZWMtNDVhMy04NTQ5LWU0OWYxZmRkOWVjOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImM2NjZjMmNmIn0.uRm_lchFmp9g7ct2DM4bXgIvrqVDIELE5QJ_ppSLOYU9OW07ZC7AfbWYd0AfRh-9NFAgDD7Dw5el1Cdk0q5ZmQ";

type FormFieldNames =
  | "articleType"
  | "title"
  | "slug"
  | "thumbnail"
  | "excerpt"
  | "content"
  | "categoryId"
  | "reference";

const formSchema = insertArticleSchema.pick({
  articleType: true,
  title: true,
  slug: true,
  thumbnail: true,
  excerpt: true,
  content: true,
  categoryId: true,
  reference: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const ArticleForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      articleType: 1,
      title: "",
      slug: "",
      thumbnail: "",
      excerpt: "",
      content: "",
      categoryId: 1,
      reference: "",
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form Section */}
      <div className="flex-1 max-h-screen overflow-y-auto p-4 border rounded-lg shadow-md bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {Object.keys(formSchema.shape).map((key) => (
              <React.Fragment key={key}>
                {key === "content" ? (
                  <div className="col-span-2">
                    {/* Field for content */}
                    <FormField
                      control={form.control}
                      name={key as keyof FormValues}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold mb-2">
                            محتوا
                          </FormLabel>
                          <FormControl>
                            <CKEditor
                              editor={ClassicEditor}
                              config={{
                                licenseKey: LICENSE_KEY,
                                plugins: [Essentials, Paragraph, Bold, Italic],
                                toolbar: [
                                  "undo",
                                  "redo",
                                  "|",
                                  "bold",
                                  "italic",
                                  "|",
                                ],
                              }}
                              onChange={(event: any, editor: any) => {
                                const data = editor.getData();
                                field.onChange(data);
                              }}
                              disabled={disabled}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : (
                  <div>
                    {/* Other fields */}
                    <FormField
                      control={form.control}
                      name={key as keyof FormValues}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold mb-2">
                            {key === "title"
                              ? "عنوان"
                              : key === "slug"
                              ? "نامک"
                              : key === "thumbnail"
                              ? "تصویر شاخص"
                              : key === "excerpt"
                              ? "چکیده"
                              : key === "categoryId"
                              ? "دسته‌بندی"
                              : key === "reference"
                              ? "مرجع"
                              : "مقدار"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md shadow-sm"
                              placeholder={`وارد کردن ${key}`}
                              {...field}
                              value={field.value ?? ""}
                              disabled={disabled}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}

            {/* Submit and Delete Buttons */}
            <div className="col-span-2">
              <Button className="w-full" disabled={disabled}>
                {id ? "ذخیره تغییرات" : "ایجاد مقاله"}
              </Button>
            </div>
            {id && (
              <div className="col-span-2 mt-2">
                <Button
                  type="button"
                  onClick={handleDelete}
                  className="w-full"
                  variant="outline"
                  disabled={disabled}
                >
                  <Trash className="size-4 mr-2" />
                  حذف مقاله
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};
