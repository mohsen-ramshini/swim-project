import { z } from "zod";
import { useNewCategory } from "@/features/articleCategory/hook/use-new-category";
import { ArticleCategoryForm } from "@/features/articleCategory/components/form/ArticleCatForm";
import { useCreateCategory } from "../../api/use-create-article-cat";

import { insertArticleCategoriesSchema } from "@/db/schema/articleCategory";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useGetArticle } from "../../api/use-get-category";

const formSchema = insertArticleCategoriesSchema.pick({
  title: true,
  slug: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Edit</SheetDescription>
        </SheetHeader>
        <ArticleCategoryForm onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};
