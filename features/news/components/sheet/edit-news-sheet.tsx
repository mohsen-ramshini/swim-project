import { z } from "zod";

import { useOpenNews } from "@/features/news/hook/use-open-news";
// import { ArticleForm } from "@/features/article/components/form/ArticleForm";
import { useGetSingleNews } from "@/features/news/api/use-get-single-news";
import { useEditNews } from "@/features/news/api/use-edit-news";
import { useDeleteNews } from "@/features/news/api/use-delete-news";

import { useConfirm } from "@/hooks/use-confirm";
import { insertNewsSchema } from "@/db/schema/news/news";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const formSchema = insertNewsSchema.pick({
  title: true,
  slug: true,
  // isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditNewsSheet = () => {
  const { isOpen, onClose, id } = useOpenNews();

  const [ConfirmDiaolg, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this news"
  );

  const editMutation = useEditNews(id);
  const news = useGetSingleNews(id);
  const deleteMutation = useDeleteNews(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = news.isLoading;

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

  const defaultValues = news.data
    ? {
        title: news.data.title,
        id: news.data.id,
        slug: news.data.slug,
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
            <SheetTitle>Edit news</SheetTitle>
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
