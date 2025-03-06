"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";

import { insertArticleSchema } from "@/db/schema/article/article";

// Dynamically import CKEditor
// const CKEditor = dynamic(
//   () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
//   {
//     ssr: false,
//   }
// );
// const ClassicEditor = dynamic(
//   () => import("@ckeditor/ckeditor5-build-classic"),
//   { ssr: false }
// );
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from "ckeditor5";

const LICENSE_KEY =
  "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3MzgxOTUxOTksImp0aSI6IjhiZDk3MmYxLWM2ZWMtNDVhMy04NTQ5LWU0OWYxZmRkOWVjOSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImM2NjZjMmNmIn0.uRm_lchFmp9g7ct2DM4bXgIvrqVDIELE5QJ_ppSLOYU9OW07ZC7AfbWYd0AfRh-9NFAgDD7Dw5el1Cdk0q5ZmQ";

type FormFieldNames =
  | "articleType"
  | "title"
  | "slug"
  | "thumbnail"
  | "excerpt"
  | "content"
  // | "isActive"
  | "categoryId"
  | "reference";
// | "publishTime";

const formSchema = insertArticleSchema.pick({
  articleType: true,
  title: true,
  slug: true,
  thumbnail: true,
  excerpt: true,
  content: true,
  categoryId: true,
  reference: true,
  //   publishTime: true,
  //   isActive: true,
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
      // isActive: true,
    },
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          {Object.keys(formSchema.shape).map((key) => {
            if (key === "content") {
              return (
                <FormField
                  key={key}
                  control={form.control}
                  name={key}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        {/* <CKEditor
                          editor={ClassicEditor}
                          data={field.value}
                          onChange={(event: any, editor: any) => {
                            const data = editor.getData();
                            field.onChange(data);
                          }}
                          disabled={disabled}
                        /> */}
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
                            initialData:
                              "<p>Hello from CKEditor 5 in React!</p>",
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              );
            }

            // if (key === "isActive") {
            //   return (
            //     <FormField
            //       key={key}
            //       control={form.control}
            //       name={key}
            //       render={({ field }) => (
            //         <FormItem>
            //           <FormLabel>Active</FormLabel>
            //           <FormControl>
            //             <Checkbox
            //               checked={field.value}
            //               onCheckedChange={field.onChange}
            //               ref={field.ref}
            //               disabled={disabled}
            //             />
            //           </FormControl>
            //           <FormMessage />
            //         </FormItem>
            //       )}
            //     />
            //   );
            // }

            return (
              <FormField
                key={key}
                control={form.control}
                name={key as FormFieldNames}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={`Enter ${key}`}
                        {...field}
                        disabled={disabled}
                        value={
                          key === "publishTime"
                            ? field.value
                              ? field.value.toString()
                              : ""
                            : field.value || ""
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          <Button className="w-full" disabled={disabled}>
            {id ? "Save Changes" : "Create Article"}
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
