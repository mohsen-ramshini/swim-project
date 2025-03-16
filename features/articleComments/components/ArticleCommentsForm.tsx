"use client";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateComment } from "@/features/articleComments/api/use-create-article-comment";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Textarea } from "@/components/ui/textarea";
import { insertArticleCommentsSchema } from "@/db/schema/article/articleComments";

const formSchema = insertArticleCommentsSchema.pick({
  text: true,
  articleId: true,
  parentId: true,
  userId: true,
});

type FormValues = z.input<typeof formSchema>;

const ArticleCommentsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });

  const mutation = useCreateComment();

  function onSubmit(values: FormValues) {
    const formData = {
      ...values,
      id: 1,
      articleId: 1,
      parentId: 1,
      userId: 1,
      // createDate: new Date(),
    };

    mutation.mutate(formData, {
      onSuccess: () => {
        console.log("Comment submitted successfully");
      },
      onError: (error) => {
        console.error("Error submitting comment:", error);
      },
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Comment</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md"
          >
            {/* Text */}
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter your comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ArticleCommentsForm;
