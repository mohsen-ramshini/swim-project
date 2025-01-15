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

import { insertArticleSchema } from "@/db/schema/article";

// Dynamically import CKEditor
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  {
    ssr: false,
  }
);
const ClassicEditor = dynamic(
  () => import("@ckeditor/ckeditor5-build-classic"),
  { ssr: false }
);

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
  // publishTime: true,
  // isActive: true,
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
                        <CKEditor
                          editor={ClassicEditor}
                          data={field.value}
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
