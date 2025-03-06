import { z } from "zod";

import { useOpenArticle } from "@/features/article/hook/use-open-article";
// import { ArticleForm } from "@/features/article/components/form/ArticleForm";
import { useGetArticle } from "@/features/article/api/use-get-article";
import { useEditArticle } from "@/features/article/api/use-edit-article";
import { useDeleteArticle } from "@/features/article/api/use-delete-article";

import { useConfirm } from "@/hooks/use-confirm";
import { insertArticleSchema } from "@/db/schema/article/article";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const formSchema = insertArticleSchema.pick({
  title: true,
  slug: true,
  // isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditArticleSheet = () => {
  const { isOpen, onClose, id } = useOpenArticle();

  const [ConfirmDiaolg, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this article"
  );

  const editMutation = useEditArticle(id);
  const article = useGetArticle(id);
  const deleteMutation = useDeleteArticle(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = article.isLoading;

  // const onSubmit = (values: FormValues) => {
  //   editMutation.mutate(values, {
  //     onSuccess: () => {
  //       onClose();
  //     },
  //   });
  // };

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

  const defaultValues = article.data
    ? {
        title: article.data.title,
        id: article.data.id,
        slug: article.data.slug,
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
            <SheetTitle>Edit Article</SheetTitle>
            <SheetDescription>Edit</SheetDescription>
          </SheetHeader>

          {/* <ArticleForm /> */}

          {/* {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <ArticleForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )} */}
        </SheetContent>
      </Sheet>
    </>
  );
};
