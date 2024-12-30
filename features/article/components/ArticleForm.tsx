import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateAccount } from "@/features/article/api/use-create-article";
import { v4 as uuidv4 } from "uuid";
// import { insertArticleSchema } from "@/db/schema";
import { Checkbox } from "@/components/ui/checkbox";

const articleSchema = z.object({
  id: z.number().optional(),
  articleType: z
    .number()
    .min(1, { message: "Invalid article type" })
    .default(1),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be a valid URL-friendly string",
    }),
  thumbnail: z.string().optional(),
  excerpt: z.string().min(1, { message: "Excerpt is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  categoryId: z.number().min(1, { message: "Category ID is required" }),
  reference: z.string().optional(),
  publishTime: z.date().refine((value) => !isNaN(value.getTime()), {
    message: "Invalid publish time",
  }),
  isActive: z.boolean().default(true),
});

// const articleSchema = insertArticleSchema.pick({
//   id: true,
//   articleType: true,
//   title: true,
//   slug: true,
//   thumbnail: true,
//   excerpt: true,
//   content: true,
//   categoryId: true,
//   reference: true,
//   publishTime: true,
//   isActive: true,
// });

const ArticleForm = () => {
  const form = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
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

  type articleValues = z.input<typeof articleSchema>;

  const mutation = useCreateAccount();

  function onSubmit(values: articleValues) {
    const generatedId = uuidv4();
    const formData = {
      ...values,
      id: 1,
      createdBy: 1,
      createdAt: new Date(),
      modifiedBy: null,
      modifiedAt: null,
      publishTime: new Date(values.publishTime),
    };

    mutation.mutate(formData);
    console.log(formData);
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-4">Article</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 bg-gray-100 p-6 rounded-lg shadow-md"
          >
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the title" {...field} />
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
                    <Input placeholder="URL-friendly slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <FormControl>
                  <Input placeholder="Thumbnail URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            {/* Excerpt */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Input placeholder="Short article description" {...field} />
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
                      placeholder="Full article content"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category ID */}
            {/* <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category ID</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter category ID"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            {/* Reference */}
            {/* <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference</FormLabel>
                <FormControl>
                  <Input placeholder="References (if any)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            {/* Publish Time */}
            {/* <FormField
            control={form.control}
            name="publishTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publish Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    value={
                      field.value ? field.value.toISOString().slice(0, 16) : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

            {/* Is Active */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active</FormLabel>
                  <FormControl>
                    <Checkbox
                      checked={field.value} // Bind the boolean value to 'checked'
                      onCheckedChange={field.onChange} // Use `onCheckedChange` for toggling
                      ref={field.ref} // Ensure the `ref` is passed
                    />
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

export default ArticleForm;
