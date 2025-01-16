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
import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor } from "ckeditor5";

type FormValues = {
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
  categoryId: string;
  reference: string;
  content: string;
};

const SimpleArticleForm = ({}: // onSubmit,
{
  // onSubmit: (data: FormValues) => void;
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      title: "",
      slug: "",
      thumbnail: "",
      excerpt: "",
      categoryId: "",
      reference: "",
      content: "",
    },
  });

  const contentValue = watch("content");

  return (
    <form
      // onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto space-y-6"
    >
      <div className="flex flex-wrap gap-10">
        {/* Title */}
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 font-semibold text-gray-700">
            عنوان
          </label>
          <Input
            placeholder="وارد کردن عنوان"
            {...register("title")}
            className="border-gray-300 rounded-md"
          />
        </div>
        {/* Slug */}
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 font-semibold text-gray-700">نامک</label>
          <Input
            placeholder="وارد کردن نامک"
            {...register("slug")}
            className="border-gray-300 rounded-md"
          />
        </div>
        {/* Thumbnail */}
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 font-semibold text-gray-700">
            تصویر شاخص
          </label>
          <Input
            placeholder="وارد کردن لینک تصویر شاخص"
            {...register("thumbnail")}
            className="border-gray-300 rounded-md"
          />
        </div>
        {/* Excerpt */}
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 font-semibold text-gray-700">
            چکیده
          </label>
          <Input
            placeholder="وارد کردن چکیده"
            {...register("excerpt")}
            className="border-gray-300 rounded-md"
          />
        </div>
        {/* Category */}
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 font-semibold text-gray-700">
            دسته‌بندی
          </label>
          <Input
            placeholder="وارد کردن دسته‌بندی"
            {...register("categoryId")}
            className="border-gray-300 rounded-md"
          />
        </div>
        {/* Reference */}
        <div className="w-full sm:w-1/2">
          <label className="block mb-2 font-semibold text-gray-700">مرجع</label>
          <Input
            placeholder="وارد کردن مرجع"
            {...register("reference")}
            className="border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">محتوا</label>
        <CKEditor
          editor={ClassicEditor}
          data={contentValue}
          onChange={(_: any, editor: any) =>
            setValue("content", editor.getData())
          }
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-md py-2"
      >
        ثبت مقاله
      </Button>
    </form>
  );
};

export default SimpleArticleForm;
