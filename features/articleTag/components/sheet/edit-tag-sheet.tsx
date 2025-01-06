import { z } from "zod";

import { useOpenTag } from "@/features/articleTag/hook/use-open-tag";
import { ArticleTagForm } from "@/features/articleTag/components/form/ArticleTagForm";
import { useGetTag } from "@/features/articleTag/api/use-get-tag";
import { useEditTag } from "@/features/articleTag/api/use-edit-tag";
import { useDeleteTag } from "@/features/articleTag/api/use-delete-tag";

import { useConfirm } from "@/hooks/use-confirm";
import { insertArticleTagSchema } from "@/db/schema/articleTag";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const formSchema = insertArticleTagSchema.pick({
  title: true,
  slug: true,
  isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditTagSheet = () => {
  const { isOpen, onClose, id } = useOpenTag();

  const [ConfirmDiaolg, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this Tag"
  );

  const editMutation = useEditTag(id);
  const articleTag = useGetTag(id);
  const deleteMutation = useDeleteTag(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = articleTag.isLoading;

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

  const defaultValues = articleTag.data
    ? {
        title: articleTag.data.title,
        id: articleTag.data.id,
        slug: articleTag.data.slug,
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
            <SheetTitle>Edit Tag</SheetTitle>
            <SheetDescription>Edit</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <ArticleTagForm
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
