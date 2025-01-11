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
import { Checkbox } from "@/components/ui/checkbox";
import { Trash } from "lucide-react";

import { insertArticleSchema } from "@/db/schema/article";

const formSchema = insertArticleSchema.pick({
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,
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
      id: undefined,
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      isActive: true,
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
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the title"
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the slug"
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Excerpt */}
          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a short excerpt"
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Enter the content"
                    {...field}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Is Active */}
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Active</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    ref={field.ref}
                    disabled={disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
