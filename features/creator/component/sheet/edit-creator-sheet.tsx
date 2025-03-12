import { z } from "zod";

import { useOpenCreator } from "@/features/creator/hook/use-open-creator";
// import { ArticleForm } from "@/features/article/components/form/ArticleForm";
import { useGetCreator } from "@/features/creator/api/use-get-creator";
import { useEditCreator } from "@/features/creator/api/use-edit-creator";
import { useDeleteCreator } from "@/features/creator/api/use-delete-creator";

import { useConfirm } from "@/hooks/use-confirm";
import { insertCreatorSchema } from "@/db/schema/article/creator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2 } from "lucide-react";

const formSchema = insertCreatorSchema.pick({
  id: true,
  name: true,
  // isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCreatorSheet = () => {
  const { isOpen, onClose, id } = useOpenCreator();

  const [ConfirmDiaolg, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this creator"
  );

  const editMutation = useEditCreator(id);
  const creator = useGetCreator(id);
  const deleteMutation = useDeleteCreator(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = creator.isLoading;

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

  const defaultValues = creator.data
    ? {
        id: creator.data.id,
        name: creator.data.name,
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
