import { z } from "zod";
import { useNewTag } from "@/features/articleTag/hook/use-new-tag";
import { ArticleTagForm } from "@/features/articleTag/components/form/ArticleTagForm";
import { useCreateTag } from "@/features/articleTag/api/use-create-tag";

import { insertArticleTagSchema } from "@/db/schema/articleTag";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const formSchema = insertArticleTagSchema.pick({
  title: true,
  slug: true,
  isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTahSheet = () => {
  const { isOpen, onClose } = useNewTag();

  const mutation = useCreateTag();

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
          <SheetTitle>New Tag</SheetTitle>
          <SheetDescription>Edit</SheetDescription>
        </SheetHeader>
        <ArticleTagForm onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};
