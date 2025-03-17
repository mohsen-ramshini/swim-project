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

import { insertBookSchema } from "@/db/schema/book/book";
import { Trash } from "lucide-react";
import { useGetBooks } from "@/features/book/api/use-get-books";
import { useGetCategories } from "@/features/articleCategory/api/use-get-categories";

const formSchema = insertBookSchema.pick({
  title: true,
  slug: true,
  thumbnail: true,
  description: true,
  author: true,
  bookComments: true,
  price: true,
  ISBN: true,
  editionNo: true,
  state: true,
  pageCount: true,
  publishTime: true,
  // publishTime: true,
  isActive: true,
  categoryId: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const BookForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      title: "",
      slug: "",
      thumbnail: "",
      author: "",
      description: "",
      bookComments: "",
      price: 0,
      ISBN: "",
      editionNo: 0,
      state: "",
      pageCount: 0,
      // publishTime: true,
      isActive: true,
      categoryId: 0,
    },
  });

  const { data: categories, isLoading, isError } = useGetCategories();

  const [publishDate, setPublishDate] = useState<Date | null>(null);

  const handleFormSubmit = (values: FormValues) => {
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
          <div className="flex flex-wrap gap-6 rtl">
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
          </div>

          <div className="flex flex-wrap gap-6 rtl">
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
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نویسنده</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="نام نویسنده را وارد کنید"
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>توضیحات</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="توضیحات را وارد کنید"
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Book Comments */}
            {/* <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="bookComments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نظرات کتاب</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="نظرات کتاب را وارد کنید"
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div> */}
          </div>

          <div className="flex flex-wrap gap-6 rtl">
            {/* Price */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>قیمت</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="قیمت را وارد کنید"
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* ISBN */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="ISBN"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ISBN را وارد کنید"
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Edition No */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="editionNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>شماره ویرایش</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="شماره ویرایش را وارد کنید"
                        type="number"
                        {...field}
                        disabled={disabled}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || 0)
                        }
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>دسته‌بندی</FormLabel>
                    <FormControl>
                      <Select
                        value={String(field.value || 1)} // 1 به عنوان مقدار پیش‌فرض
                        onValueChange={(value) => field.onChange(Number(value))}
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
          </div>

          <div className="flex flex-wrap gap-6 rtl">
            {/* State */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وضعیت</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="وضعیت را وارد کنید"
                        {...field}
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Page Count */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="pageCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تعداد صفحات</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="تعداد صفحات را وارد کنید"
                        type="number"
                        min="0" // اطمینان از اینکه عدد منفی وارد نشود
                        {...field}
                        onChange={
                          (e) =>
                            field.onChange(Math.max(0, Number(e.target.value))) // اطمینان از اینکه عدد منفی نخواهد بود
                        }
                        disabled={disabled}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Is Active */}
            <div className="sm:w-1/3">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>فعال</FormLabel>
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
                    <Input
                      type="datetime-local"
                      {...field}
                      disabled={disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

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
              حذف کتاب
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
