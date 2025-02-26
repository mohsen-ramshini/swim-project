import { z } from "zod";
import { useNewArticle } from "@/features/article/hook/use-new-article";
import { ArticleForm } from "@/features/article/components/form/ArticleForm";
import { useCreateArticle } from "@/features/article/api/use-create-article";

import { insertArticleSchema } from "@/db/schema/article";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";

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

export const NewArticleSheet = () => {
  const { isArticleOpen, onCloseArticle } = useNewArticle();

  useEffect(() => {
    console.log(`sheet is open :${isArticleOpen}`);
  }, [isArticleOpen]);

  const mutation = useCreateArticle();

  const onSubmit = (values: FormValues) => {
    console.log("Submitting values:", values); // Log form values before mutation

    mutation.mutate(values, {
      onSuccess: () => {
        onCloseArticle();
        console.log("Success artilce sent:", values);
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    });
  };

  return (
    <div className="overflow-y-auto">
      <Sheet open={isArticleOpen} onOpenChange={onCloseArticle}>
        <SheetContent className="space-y-4 " side={"bottom"} dir="rtl">
          <SheetHeader>
            <SheetTitle
              style={{
                textAlign: "right",
              }}
            >
              مقاله جدید
            </SheetTitle>
            <SheetDescription
              style={{
                textAlign: "right",
              }}
            >
              جزییات
            </SheetDescription>
          </SheetHeader>
          <ArticleForm onSubmit={onSubmit} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
