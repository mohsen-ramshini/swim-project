import React, { useState, ChangeEvent, FormEvent } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Combobox } from "@/components/ComboBox";
import TextEditor from "@/components/TextEditor";

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

interface FormData {
  title: string;
  slug: string;
  thumbnail: File | null;
  excerpt: string;
  content: string;
  categoryId: string;
  reference: string;
  publishDate: any;
  publishTime: string;
  active: boolean;
  articleType: string;
}

const formSchema = insertArticleSchema.pick({
  articleType: true,
  title: true,
  slug: true,
  thumbnail: true,
  excerpt: true,
  content: true,
  categoryId: true,
  reference: true,
  publishTime: true,
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
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
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
      publishTime: new Date(),
      isActive: true,
    },
  });

  const handleFormSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  const categories = [
    { id: 1, name: "اخبار" },
    { id: 2, name: "ورزشی" },
    { id: 3, name: "فرهنگی" },
    { id: 4, name: "علمی" },
  ];

  const articleTypes = [
    { id: 1, name: "تحلیل" },
    { id: 2, name: "راهنما" },
    { id: 3, name: "خبر" },
    { id: 4, name: "آموزشی" },
  ];

  // const handleInputChange = (
  //   e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     thumbnail: file,
  //   }));
  // };

  // const handleContentChange = (field: keyof FormData, value: string) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));
  // };

  // const handleDateChange = (date: any) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     publishDate: date,
  //   }));
  // };

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault();

  //   const { publishDate, publishTime, articleType } = formData;

  //   if (!publishDate || !publishTime || !articleType) {
  //     console.error("Please fill in all required fields.");
  //     return;
  //   }

  //   const publishDateTime = new Date(
  //     `${publishDate.year}-${publishDate.month.number}-${publishDate.day}T${publishTime}`
  //   );

  //   const submittedData = {
  //     ...formData,
  //     publishDateTime,
  //   };

  //   console.log("Submitted Data:", submittedData);
  // };

  return (
    <div className="max-h-full flex justify-center items-center rtl overflow-y-auto">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="p-8 bg-white rounded-lg shadow-lg max-w-5xl mx-auto space-y-6 w-full rtl mt-80 overflow-y-auto max-h-screen"
          style={{ maxHeight: "80vh", overflowY: "auto", direction: "rtl" }}
        >
          <div className="flex flex-wrap gap-6 rtl">
            <div className="sm:w-1/3 rtl ml-2">
              <Label className="block mb-2 font-semibold text-gray-700 text-right max-w-10 rtl">
                نوع مقاله
              </Label>
              <Select {...register("articleType")}>
                <SelectTrigger style={{ direction: "rtl" }}>
                  <SelectValue placeholder="انتخاب نوع مقاله" />
                </SelectTrigger>
                <SelectContent style={{ direction: "rtl" }}>
                  {articleTypes.map((type) => (
                    <SelectItem key={type.id} value={String(type.id)}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:w-1/3">
              <Label className="block mb-2 font-semibold text-gray-700 text-right max-w-11">
                دسته‌بندی
              </Label>
              <Select {...register("categoryId")}>
                <SelectTrigger style={{ direction: "rtl" }}>
                  <SelectValue placeholder="انتخاب دسته‌بندی" />
                </SelectTrigger>
                <SelectContent style={{ direction: "rtl" }}>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:w-1/3">
              <Label
                htmlFor="title"
                className="block mb-2 font-semibold text-gray-700 text-right"
              >
                عنوان
              </Label>
              <Input
                id="title"
                type="text"
                {...register("title")}
                placeholder="وارد کردن عنوان"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 rtl">
            <div className="sm:w-1/3">
              <Label
                htmlFor="slug"
                className="block mb-2 font-semibold text-gray-700 text-right"
              >
                نامک
              </Label>
              <Input
                id="slug"
                type="text"
                {...register("slug")}
                placeholder="وارد کردن نامک"
              />
            </div>

            <div className="sm:w-1/3">
              <Label
                htmlFor="thumbnail"
                className="block mb-2 font-semibold text-gray-700 text-right"
              >
                تصویر شاخص
              </Label>
              <Input
                id="thumbnail"
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="sm:w-1/3">
              <Label
                htmlFor="reference"
                className="block mb-2 font-semibold text-gray-700 text-right"
              >
                مرجع
              </Label>
              <Input
                id="reference"
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                placeholder="وارد کردن مرجع"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="sm:w-1/3">
              <Label
                htmlFor="active"
                className="block mb-2 font-semibold text-gray-700 text-right"
              >
                فعال
              </Label>
              <Checkbox
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, active: !!checked }))
                }
              />
            </div>

            <div className="sm:w-1/3">
              <Label
                htmlFor="publishTime"
                className="block mb-2 font-semibold text-gray-700 text-right"
              >
                زمان انتشار
              </Label>
              <Input
                id="publishTime"
                type="time"
                name="publishTime"
                value={formData.publishTime}
                onChange={handleInputChange}
              />
            </div>

            <div className="sm:w-1/3">
              <Label className="block mb-2 font-semibold text-gray-700 text-right">
                تاریخ انتشار
              </Label>
              <DatePicker
                calendar={persian}
                locale={persian_fa}
                value={formData.publishDate}
                onChange={handleDateChange}
                placeholder="انتخاب تاریخ انتشار"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="w-full">
              <Label className="block mb-2 font-semibold text-gray-700 text-right">
                چکیده
              </Label>
              <TextEditor
                onChange={(value: any) => handleContentChange("excerpt", value)}
                content={formData.excerpt}
              />
            </div>

            <div className="w-full">
              <Label className="block mb-2 font-semibold text-gray-700 text-right">
                محتوا
              </Label>
              <TextEditor
                onChange={(value: any) => handleContentChange("content", value)}
                content={formData.content}
              />
            </div>
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
              Delete Article
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};
