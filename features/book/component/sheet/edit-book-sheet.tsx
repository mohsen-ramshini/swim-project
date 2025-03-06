import { z } from "zod";

import { useOpenBook } from "@/features/book/hook/use-open-book";
// import { ArticleForm } from "@/features/article/components/form/ArticleForm";
import { useGetBook } from "@/features/book/api/use-get-book";
import { useEditBook } from "@/features/book/api/use-edit-book";
import { useDeleteBook } from "@/features/book/api/use-delete-book";

import { useConfirm } from "@/hooks/use-confirm";
import { insertBookSchema } from "@/db/schema/book/book";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const formSchema = insertBookSchema.pick({
  title: true,
  slug: true,
  // isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditBookSheet = () => {
  const { isOpen, onClose, id } = useOpenBook();

  const [ConfirmDiaolg, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this book"
  );

  const editMutation = useEditBook(id);
  const book = useGetBook(id);
  const deleteMutation = useDeleteBook(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = book.isLoading;

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

  const defaultValues = book.data
    ? {
        title: book.data.title,
        id: book.data.id,
        slug: book.data.slug,
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
