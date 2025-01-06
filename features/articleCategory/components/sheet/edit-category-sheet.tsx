import { z } from "zod";

import { useOpenCategory } from "@/features/articleCategory/hook/use-open-category";
import { ArticleCategoryForm } from "@/features/articleCategory/components/form/ArticleCatForm";
import { UseGetCategory } from "@/features/articleCategory/api/use-get-category";
import { useEditCategory } from "@/features/articleCategory/api/use-edit-category";
import { useDeleteCategory } from "@/features/articleCategory/api/use-delete-category";

import { useConfirm } from "@/hooks/use-confirm";
import { insertArticleCategoriesSchema } from "@/db/schema/articleCategory";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const formSchema = insertArticleCategoriesSchema.pick({
  title: true,
  slug: true,
  isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  const [ConfirmDiaolg, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category"
  );

  const editMutation = useEditCategory(id);
  const articleCat = UseGetCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = articleCat.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = articleCat.data
    ? {
        title: articleCat.data.title,
        id: articleCat.data.id,
        slug: articleCat.data.slug,
      }
    : {
        title: "",
        id: 1,
        slug: "",
      };

  return (
    <>
      <ConfirmDiaolg />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <ArticleCategoryForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
