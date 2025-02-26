import React, { useEffect, useState } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Combobox } from "@/components/appLayout/ComboBox";
import TextEditor from "@/components/modules/TextEditor";

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

import { insertArticleSchema } from "@/db/schema/article";
import { Trash } from "lucide-react";
import { useGetCategories } from "@/features/articleCategory/api/use-get-categories";

const formSchema = insertArticleSchema.pick({
  articleType: true,
  title: true,
  slug: true,
  thumbnail: true,
  excerpt: true,
  content: true,
  categoryId: true,
  reference: true,
  // publishTime: true,
  isActive: true,
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
      // publishTime: new Date(),
      isActive: true,
    },
  });

  const { data: categories, isLoading, isError } = useGetCategories();

  const [publishDate, setPublishDate] = useState<Date | null>(null);

  const handleFormSubmit = (values: FormValues) => {
    // if (publishDate && values.publishTime) {
    //   const combinedDateTime = new Date(
    //     publishDate.getFullYear(),
    //     publishDate.getMonth(),
    //     publishDate.getDate(),
    //     new Date(values.publishTime).getHours(),
    //     new Date(values.publishTime).getMinutes()
    //   );
    //   onSubmit({ ...values, publishTime: combinedDateTime });
    // console.log("publishTime type:", typeof values.publishTime); // Should be "object"
    // console.log("publishTime value:", values.publishTime);
    // console.log(
    //   "publishTime instanceof Date:",
    //   values.publishTime instanceof Date
    // );

    onSubmit(values);

    console.log(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  const articleTypes = [
    { id: 1, name: "تحلیل" },
    { id: 2, name: "راهنما" },
    { id: 3, name: "خبر" },
    { id: 4, name: "آموزشی" },
  ];

  return (
    <div className="max-h-full flex justify-center items-center rtl overflow-y-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="p-8 bg-white rounded-lg shadow-lg max-w-5xl mx-auto space-y-6 w-full rtl mt-80 overflow-y-auto max-h-screen"
          style={{ maxHeight: "80vh", overflowY: "auto", direction: "rtl" }}
        >
          <div className="flex flex-wrap gap-6 rtl">
            {/* Article Type */}
            <div className="sm:w-1/3 rtl ml-2">
              <FormField
                control={form.control}
                name="articleType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع مقاله</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value)}
                        onValueChange={(value) => field.onChange(Number(value))}
                        disabled={disabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب نوع مقاله" />
                        </SelectTrigger>
                        <SelectContent>
                          {articleTypes.map((type) => (
                            <SelectItem key={type.id} value={String(type.id)}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Category */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>دسته‌بندی</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value)} // Convert number to string
                        onValueChange={(value) => field.onChange(Number(value))} // Convert string back to number
                        disabled={disabled}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="انتخاب دسته‌بندی" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoading ? (
                            <SelectItem value="">در حال بارگذاری...</SelectItem>
                          ) : isError ? (
                            <SelectItem value="">خطا در بارگذاری</SelectItem>
                          ) : (
                            categories?.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={String(category.id)}
                              >
                                {category.title}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Title */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="عنوان را وارد کنید"
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 rtl">
            {/* Slug */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسلاگ</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="اسلاگ را وارد کنید"
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Thumbnail */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تصویر شاخص</FormLabel>
                    <FormControl>
                      <Input
                        id="thumbnail"
                        type="file"
                        accept="image/*"
                        disabled={disabled}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // Here you can either store a file URL or handle the file upload and get the URL
                            const fileUrl = URL.createObjectURL(file); // Create a temporary URL for local usage
                            field.onChange(fileUrl); // Pass the file URL (string) instead of the file object
                          } else {
                            field.onChange(null); // Handle case where no file is selected
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Reference */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="reference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>مرجع</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="مرجع را وارد کنید"
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            {/* Is Active */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="px-2">فعال</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Publish Time */}
            {/* <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="publishTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>زمان و تاریخ انتشار</FormLabel>
                    <FormControl>
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={field.value}
                        onChange={(date) =>
                          field.onChange(date ? new Date(date.toDate()) : null)
                        }
                        placeholder="انتخاب تاریخ انتشار"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}

            {/* Publish Date */}
            {/* <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="publishDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تاریخ انتشار</FormLabel>
                    <FormControl>
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={publishDate}
                        onChange={setPublishDate}
                        placeholder="انتخاب تاریخ انتشار"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          </div>

          {/* Excerpt */}
          <div className="w-full">
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>چکیده</FormLabel>
                  <FormControl>
                    <TextEditor
                      onChange={field.onChange}
                      content={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Content */}
          <div className="w-full">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>محتوا</FormLabel>
                  <FormControl>
                    <TextEditor
                      onChange={field.onChange}
                      content={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full" disabled={disabled}>
            {id ? "ذخیره تغییرات" : "ایجاد مقاله"}
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
