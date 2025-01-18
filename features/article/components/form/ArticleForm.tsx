// "use client";
// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import dynamic from "next/dynamic";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Trash } from "lucide-react";

// import { insertArticleSchema } from "@/db/schema/article";

// // Dynamically import CKEditor
// // const CKEditor = dynamic(
// //   () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
// //   {
// //     ssr: false,
// //   }
// // );
// // const ClassicEditor = dynamic(
// //   () => import("@ckeditor/ckeditor5-build-classic"),
// //   { ssr: false }
// // );
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from "ckeditor5";

// const LICENSE_KEY =
//   "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzgxOTUxOTksImp0aSI6IjhiZDk3MmYxLWM2ZWMtNDVhMy04NTQ5LWU0OWYxZmRkOWVjOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImM2NjZjMmNmIn0.uRm_lchFmp9g7ct2DM4bXgIvrqVDIELE5QJ_ppSLOYU9OW07ZC7AfbWYd0AfRh-9NFAgDD7Dw5el1Cdk0q5ZmQ";

// type FormFieldNames =
//   | "articleType"
//   | "title"
//   | "slug"
//   | "thumbnail"
//   | "excerpt"
//   | "content"
//   // | "isActive"
//   | "categoryId"
//   | "reference";
// // | "publishTime";

// const formSchema = insertArticleSchema.pick({
//   articleType: true,
//   title: true,
//   slug: true,
//   thumbnail: true,
//   excerpt: true,
//   content: true,
//   categoryId: true,
//   reference: true,
//   // publishTime: true,
//   // isActive: true,
// });

// type FormValues = z.input<typeof formSchema>;

// type Props = {
//   id?: string;
//   defaultValues?: FormValues;
//   onSubmit: (values: FormValues) => void;
//   onDelete?: () => void;
//   disabled?: boolean;
// };

// export const ArticleForm = ({
//   id,
//   defaultValues,
//   onSubmit,
//   onDelete,
//   disabled,
// }: Props) => {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: defaultValues || {
//       articleType: 1,
//       title: "",
//       slug: "",
//       thumbnail: "",
//       excerpt: "",
//       content: "",
//       categoryId: 1,
//       reference: "",
//       // publishTime: new Date(),
//       // isActive: true,
//     },
//   });

//   const handleSubmit = (values: FormValues) => {
//     onSubmit(values);
//   };

//   const handleDelete = () => {
//     onDelete?.();
//   };

//   return (
//     <div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(handleSubmit)}>
//           {Object.keys(formSchema.shape).map((key) => {
//             if (key === "content") {
//               return (
//                 <FormField
//                   key={key}
//                   control={form.control}
//                   name={key}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Content</FormLabel>
//                       <FormControl>
//                         {/* <CKEditor
//                           editor={ClassicEditor}
//                           data={field.value}
//                           onChange={(event: any, editor: any) => {
//                             const data = editor.getData();
//                             field.onChange(data);
//                           }}
//                           disabled={disabled}
//                         /> */}
//                         <CKEditor
//                           editor={ClassicEditor}
//                           config={{
//                             licenseKey: LICENSE_KEY,
//                             plugins: [Essentials, Paragraph, Bold, Italic],
//                             toolbar: [
//                               "undo",
//                               "redo",
//                               "|",
//                               "bold",
//                               "italic",
//                               "|",
//                             ],
//                             initialData:
//                               "<p>Hello from CKEditor 5 in React!</p>",
//                           }}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               );
//             }

//             // if (key === "isActive") {
//             //   return (
//             //     <FormField
//             //       key={key}
//             //       control={form.control}
//             //       name={key}
//             //       render={({ field }) => (
//             //         <FormItem>
//             //           <FormLabel>Active</FormLabel>
//             //           <FormControl>
//             //             <Checkbox
//             //               checked={field.value}
//             //               onCheckedChange={field.onChange}
//             //               ref={field.ref}
//             //               disabled={disabled}
//             //             />
//             //           </FormControl>
//             //           <FormMessage />
//             //         </FormItem>
//             //       )}
//             //     />
//             //   );
//             // }

//             return (
//               <FormField
//                 key={key}
//                 control={form.control}
//                 name={key as FormFieldNames}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>{key}</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder={`Enter ${key}`}
//                         {...field}
//                         disabled={disabled}
//                         value={
//                           key === "publishTime"
//                             ? field.value
//                               ? field.value.toString()
//                               : ""
//                             : field.value || ""
//                         }
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             );
//           })}

//           <Button className="w-full" disabled={disabled}>
//             {id ? "Save Changes" : "Create Article"}
//           </Button>
//           {!!id && (
//             <Button
//               type="button"
//               onClick={handleDelete}
//               className="w-full mt-2"
//               variant="outline"
//               disabled={disabled}
//             >
//               <Trash className="size-4 mr-2" />
//               Delete Article
//             </Button>
//           )}
//         </form>
//       </Form>
//     </div>
//   );
// };
// "use client";

// import React from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Trash } from "lucide-react";

// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from "ckeditor5";
// import { insertArticleSchema } from "@/db/schema/article";

// const LICENSE_KEY =
//   "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzgxOTUxOTksImp0aSI6IjhiZDk3MmYxLWM2ZWMtNDVhMy04NTQ5LWU0OWYxZmRkOWVjOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImM2NjZjMmNmIn0.uRm_lchFmp9g7ct2DM4bXgIvrqVDIELE5QJ_ppSLOYU9OW07ZC7AfbWYd0AfRh-9NFAgDD7Dw5el1Cdk0q5ZmQ";

// type FormFieldNames =
//   | "articleType"
//   | "title"
//   | "slug"
//   | "thumbnail"
//   | "excerpt"
//   | "content"
//   | "categoryId"
//   | "reference";

// const formSchema = insertArticleSchema.pick({
//   articleType: true,
//   title: true,
//   slug: true,
//   thumbnail: true,
//   excerpt: true,
//   content: true,
//   categoryId: true,
//   reference: true,
// });

// type FormValues = z.input<typeof formSchema>;

// type Props = {
//   id?: string;
//   defaultValues?: FormValues;
//   onSubmit: (values: FormValues) => void;
//   onDelete?: () => void;
//   disabled?: boolean;
// };

// export const ArticleForm = ({
//   id,
//   defaultValues,
//   onSubmit,
//   onDelete,
//   disabled,
// }: Props) => {
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: defaultValues || {
//       articleType: 1,
//       title: "",
//       slug: "",
//       thumbnail: "",
//       excerpt: "",
//       content: "",
//       categoryId: 1,
//       reference: "",
//     },
//   });

//   const handleSubmit = (values: FormValues) => {
//     onSubmit(values);
//   };

//   const handleDelete = () => {
//     onDelete?.();
//   };

//   return (
//     <div className="flex flex-col lg:flex-row gap-8">
//       {/* Form Section */}
//       <div className="flex-1 max-h-screen overflow-y-auto p-4 border rounded-lg shadow-md bg-white">
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(handleSubmit)}
//             className="grid grid-cols-1 sm:grid-cols-2 gap-6"
//           >
//             {Object.keys(formSchema.shape).map((key) => (
//               <React.Fragment key={key}>
//                 {key === "content" ? (
//                   <div className="col-span-2">
//                     {/* Field for content */}
//                     <FormField
//                       control={form.control}
//                       name={key as keyof FormValues}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-lg font-semibold mb-2">
//                             محتوا
//                           </FormLabel>
//                           <FormControl>
//                             <CKEditor
//                               editor={ClassicEditor}
//                               config={{
//                                 licenseKey: LICENSE_KEY,
//                                 plugins: [Essentials, Paragraph, Bold, Italic],
//                                 toolbar: [
//                                   "undo",
//                                   "redo",
//                                   "|",
//                                   "bold",
//                                   "italic",
//                                   "|",
//                                 ],
//                               }}
//                               onChange={(event: any, editor: any) => {
//                                 const data = editor.getData();
//                                 field.onChange(data);
//                               }}
//                               disabled={disabled}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 ) : (
//                   <div>
//                     {/* Other fields */}
//                     <FormField
//                       control={form.control}
//                       name={key as keyof FormValues}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="text-lg font-semibold mb-2">
//                             {key === "title"
//                               ? "عنوان"
//                               : key === "slug"
//                               ? "نامک"
//                               : key === "thumbnail"
//                               ? "تصویر شاخص"
//                               : key === "excerpt"
//                               ? "چکیده"
//                               : key === "categoryId"
//                               ? "دسته‌بندی"
//                               : key === "reference"
//                               ? "مرجع"
//                               : "مقدار"}
//                           </FormLabel>
//                           <FormControl>
//                             <Input
//                               className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md shadow-sm"
//                               placeholder={`وارد کردن ${key}`}
//                               {...field}
//                               value={field.value ?? ""}
//                               disabled={disabled}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 )}
//               </React.Fragment>
//             ))}

//             {/* Submit and Delete Buttons */}
//             <div className="col-span-2">
//               <Button className="w-full" disabled={disabled}>
//                 {id ? "ذخیره تغییرات" : "ایجاد مقاله"}
//               </Button>
//             </div>
//             {id && (
//               <div className="col-span-2 mt-2">
//                 <Button
//                   type="button"
//                   onClick={handleDelete}
//                   className="w-full"
//                   variant="outline"
//                   disabled={disabled}
//                 >
//                   <Trash className="size-4 mr-2" />
//                   حذف مقاله
//                 </Button>
//               </div>
//             )}
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };
// import React from "react";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { ClassicEditor } from "ckeditor5";

// type FormValues = {
//   title: string;
//   slug: string;
//   thumbnail: string;
//   excerpt: string;
//   categoryId: string;
//   reference: string;
//   content: string;
// };

// const SimpleArticleForm = ({}: // onSubmit,
// {
//   // onSubmit: (data: FormValues) => void;
// }) => {
//   const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
//     defaultValues: {
//       title: "",
//       slug: "",
//       thumbnail: "",
//       excerpt: "",
//       categoryId: "",
//       reference: "",
//       content: "",
//     },
//   });

//   const contentValue = watch("content");

//   return (
//     <form
//       // onSubmit={handleSubmit(onSubmit)}
//       className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto space-y-6"
//     >
//       <div className="flex flex-wrap gap-10">
//         {/* Title */}
//         <div className="w-full sm:w-1/2">
//           <label className="block mb-2 font-semibold text-gray-700">
//             عنوان
//           </label>
//           <Input
//             placeholder="وارد کردن عنوان"
//             {...register("title")}
//             className="border-gray-300 rounded-md"
//           />
//         </div>
//         {/* Slug */}
//         <div className="w-full sm:w-1/2">
//           <label className="block mb-2 font-semibold text-gray-700">نامک</label>
//           <Input
//             placeholder="وارد کردن نامک"
//             {...register("slug")}
//             className="border-gray-300 rounded-md"
//           />
//         </div>
//         {/* Thumbnail */}
//         <div className="w-full sm:w-1/2">
//           <label className="block mb-2 font-semibold text-gray-700">
//             تصویر شاخص
//           </label>
//           <Input
//             placeholder="وارد کردن لینک تصویر شاخص"
//             {...register("thumbnail")}
//             className="border-gray-300 rounded-md"
//           />
//         </div>
//         {/* Excerpt */}
//         <div className="w-full sm:w-1/2">
//           <label className="block mb-2 font-semibold text-gray-700">
//             چکیده
//           </label>
//           <Input
//             placeholder="وارد کردن چکیده"
//             {...register("excerpt")}
//             className="border-gray-300 rounded-md"
//           />
//         </div>
//         {/* Category */}
//         <div className="w-full sm:w-1/2">
//           <label className="block mb-2 font-semibold text-gray-700">
//             دسته‌بندی
//           </label>
//           <Input
//             placeholder="وارد کردن دسته‌بندی"
//             {...register("categoryId")}
//             className="border-gray-300 rounded-md"
//           />
//         </div>
//         {/* Reference */}
//         <div className="w-full sm:w-1/2">
//           <label className="block mb-2 font-semibold text-gray-700">مرجع</label>
//           <Input
//             placeholder="وارد کردن مرجع"
//             {...register("reference")}
//             className="border-gray-300 rounded-md"
//           />
//         </div>
//       </div>

//       {/* Content */}
//       <div>
//         <label className="block mb-2 font-semibold text-gray-700">محتوا</label>
//         <CKEditor
//           editor={ClassicEditor}
//           data={contentValue}
//           onChange={(_: any, editor: any) =>
//             setValue("content", editor.getData())
//           }
//         />
//       </div>

//       {/* Submit Button */}
//       <Button
//         type="submit"
//         className="w-full bg-blue-500 text-white rounded-md py-2"
//       >
//         ثبت مقاله
//       </Button>
//     </form>
//   );
// };

// export default SimpleArticleForm;
import React, { useState, ChangeEvent, FormEvent } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import TextEditor from "@/components/TextEditor";

interface FormData {
  title: string;
  slug: string;
  thumbnail: File | null;
  excerpt: string;
  content: string;
  categoryId: string;
  reference: string;
  publishDate: any; // Replace `any` with the specific type from "react-multi-date-picker" if available
  publishTime: string;
  active: boolean;
  articleType: string;
}

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    slug: "",
    thumbnail: null,
    excerpt: "",
    content: "",
    categoryId: "",
    reference: "",
    publishDate: null,
    publishTime: "",
    active: false,
    articleType: "",
  });

  // Example categories
  const categories = [
    { id: 1, name: "اخبار" },
    { id: 2, name: "ورزشی" },
    { id: 3, name: "فرهنگی" },
    { id: 4, name: "علمی" },
  ];

  // Article types example
  const articleTypes = [
    { id: 1, name: "تحلیل" },
    { id: 2, name: "راهنما" },
    { id: 3, name: "خبر" },
    { id: 4, name: "آموزشی" },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      thumbnail: file,
    }));
  };

  const handleContentChange = (field: keyof FormData, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleDateChange = (date: any) => {
    setFormData((prevData) => ({
      ...prevData,
      publishDate: date,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.publishDate || !formData.publishTime) {
      console.error("Please select a publish date and time.");
      return;
    }

    const { publishDate, publishTime } = formData;
    const publishDateTime = new Date(
      `${publishDate.year}-${publishDate.month.number}-${publishDate.day}T${publishTime}`
    );

    if (isNaN(publishDateTime.getTime())) {
      console.error("Invalid publish date and time.");
      return;
    }

    const submittedData = {
      ...formData,
      publishDateTime,
    };

    console.log("Submitted Data:", submittedData);

    if (formData.thumbnail) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.thumbnail);
      console.log(reader);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100 rtl overflow-y-auto pt-3.5">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-lg shadow-lg max-w-5xl mx-auto space-y-6 w-full rtl mt-80"
      >
        <div className="flex flex-wrap gap-6 rtl">
          <div className="flex flex-wrap w-full gap-6 rtl">
            <div className="w-full sm:w-1/4">
              <label className="block mb-2 font-semibold text-gray-700 text-right">
                نوع مقاله
              </label>
              <select
                name="articleType"
                value={formData.articleType}
                onChange={handleInputChange}
                className="border-gray-300 rounded-md w-full p-2 text-right focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="" disabled>
                  انتخاب نوع مقاله
                </option>
                {articleTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block mb-2 font-semibold text-gray-700 text-right">
                دسته‌بندی
              </label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                className="border-gray-300 rounded-md w-full p-2 text-right focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="" disabled>
                  انتخاب دسته‌بندی
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-1/4">
              <label className="block mb-2 font-semibold text-gray-700 text-right">
                عنوان
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="وارد کردن عنوان"
                className="border-gray-300 rounded-md w-full p-2 text-right focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          <div className="flex flex-wrap w-full gap-6">
            <div className="w-full sm:w-1/4">
              <label className="block mb-2 font-semibold text-gray-700 text-right">
                نامک
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="وارد کردن نامک"
                className="border-gray-300 rounded-md w-full p-2 text-right focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="w-full sm:w-1/3">
              <label className="block mb-2 font-semibold text-gray-700 text-right">
                تصویر شاخص
              </label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="border-gray-300 rounded-md w-full p-2 text-right focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div className="w-full sm:w-1/4">
              <label className="block mb-2 font-semibold text-gray-700 text-right">
                مرجع
              </label>
              <input
                type="text"
                name="reference"
                value={formData.reference}
                onChange={handleInputChange}
                placeholder="وارد کردن مرجع"
                className="border-gray-300 rounded-md w-full p-2 text-right focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="w-full sm:w-1/4">
            <label
              htmlFor="active"
              className="block mb-2 font-semibold text-gray-700 text-right"
            >
              فعال
            </label>
            <input
              type="checkbox"
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
              id="active"
              className="border-gray-300 rounded-md w-3 p-2 text-right focus:ring-2 focus:ring-blue-500 transition relative -right-56"
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block mb-2 font-semibold text-gray-700 text-right">
              زمان انتشار
            </label>
            <input
              type="time"
              name="publishTime"
              value={formData.publishTime}
              onChange={handleInputChange}
              className="border-gray-300 rounded-md w-full p-2 text-right focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div className="w-full sm:w-1/4">
            <label className="block mb-2 font-semibold text-gray-700 text-right">
              تاریخ انتشار
            </label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={formData.publishDate}
              onChange={handleDateChange}
              className="border-gray-300 rounded-md w-full p-2 text-right focus:ring-2 focus:ring-blue-500 transition"
              placeholder="انتخاب تاریخ انتشار"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="w-full">
            <label className="block mb-2 font-semibold text-gray-700 text-right">
              چکیده
            </label>
            <TextEditor
              onChange={(value: any) => handleContentChange("excerpt", value)}
              content={formData.excerpt}
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 font-semibold text-gray-700 text-right">
              محتوا
            </label>
            <TextEditor
              onChange={(value: any) => handleContentChange("content", value)}
              content={formData.content}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition"
        >
          ثبت مقاله
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
