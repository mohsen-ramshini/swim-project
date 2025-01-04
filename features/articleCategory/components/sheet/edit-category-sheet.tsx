import { z } from "zod";
import { useOpenAccount } from "@/features/articleCategory/hook/use-open-category";
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
  isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditAccountSheet = () => {
  const { isOpen, onClose, id } = useOpenAccount();

  const mutation = useCreateCategory();

  const articleCat = useGetArticle(id);

  const isLoading = articleCat.isLoading;

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const defaultValues = articleCat.data
    ? {
        title: articleCat.data.title,
        id: articleCat.data.id,
      }
    : {
        title: "",
      };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Edit</SheetDescription>
        </SheetHeader>
        <ArticleCategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          //   defaultValues={defaultValues}
        />
      </SheetContent>
    </Sheet>
  );
};
