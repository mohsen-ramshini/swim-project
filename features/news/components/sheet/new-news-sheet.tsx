import { z } from "zod";
import { useNewNews } from "@/features/news/hook/use-new-news";
import { NewsForm } from "@/features/news/components/form/NewsForm";
import { useCreateNews } from "@/features/news/api/use-create-news";

import { insertNewsSchema } from "@/db/schema/news/news";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";

const formSchema = insertNewsSchema.pick({
  title: true,
  author: true,
  date: true,
  slug: true,
  content: true,
  banner: true,
  // publishDate: true,
  isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewNewsSheet = () => {
  const { isNewsOpen, onCloseNews } = useNewNews();

  const mutation = useCreateNews();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onCloseNews();
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    });
  };

  return (
    <div className="overflow-y-auto">
      <Sheet open={isNewsOpen} onOpenChange={onCloseNews}>
        <SheetContent className="space-y-4 " side={"bottom"} dir="rtl">
          <SheetHeader>
            <SheetTitle
              style={{
                textAlign: "right",
              }}
            >
              خبر جدید
            </SheetTitle>
            <SheetDescription
              style={{
                textAlign: "right",
              }}
            >
              جزییات
            </SheetDescription>
          </SheetHeader>
          <NewsForm onSubmit={onSubmit} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
