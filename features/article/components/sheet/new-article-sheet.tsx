// import { insertArticleSchema } from "@/db/schema/article";
// import { useNewArticle } from "@/features/article/hook/use-new-article";
// import { useCreateAccount } from "@/features/article/api/use-create-article";
// import { ArticleForm } from "@/features/article/components/form/ArticleForm";
// import { NewItemSheet } from "@/features/article/components/NewItemSheet";

// const articleFormSheet = insertArticleSchema.pick({
//   title: true,
//   slug: true,
//   isActive: true,
// });

// export const NewArticleSheet: React.FC = () => {
//   const { isArticleOpen, onCloseArticle } = useNewArticle();

//   return (
//     <NewItemSheet
//       isOpen={isArticleOpen}
//       onClose={onCloseArticle}
//       formSchema={articleFormSheet}
//       useMutation={useCreateAccount}
//       FormComponent={ArticleForm}
//       title="ایجاد مقاله جدید"
//       description="جزییات"
//     />
//   );
// };

import { z } from "zod";
import { useNewArticle } from "@/features/article/hook/use-new-article";
import ArticleForm from "@/features/article/components/form/ArticleForm";
import { useCreateAccount } from "@/features/article/api/use-create-article";

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
  // publishTime: true,
  // isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewArticleSheet = () => {
  const { isArticleOpen, onCloseArticle } = useNewArticle();

  useEffect(() => {
    console.log(`sheet is open :${isArticleOpen}`);
  }, [isArticleOpen]);

  const mutation = useCreateAccount();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onCloseArticle();
      },
    });
  };

  return (
    <div className="overflow-y-auto">
      <Sheet open={isArticleOpen} onOpenChange={onCloseArticle}>
        <SheetContent className="space-y-4" side={"bottom"} dir="rtl">
          <SheetHeader>
            <SheetTitle>مقاله جدید</SheetTitle>
            <SheetDescription>جزییات</SheetDescription>
          </SheetHeader>
          {/* <ArticleForm onSubmit={onSubmit} /> */}
          <ArticleForm />
        </SheetContent>
      </Sheet>
    </div>
  );
};
