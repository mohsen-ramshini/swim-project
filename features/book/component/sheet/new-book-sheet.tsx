import { z } from "zod";
import { useNewBook } from "@/features/book/hook/use-new-book";
import { BookForm } from "@/features/book/component/form/BookForm";
import { useCreateBook } from "@/features/book/api/use-create-book";

import { insertBookSchema } from "@/db/schema/book/book";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";

const formSchema = insertBookSchema.pick({
  title: true,
  slug: true,
  thumbnail: true,
  description: true,
  author: true,
  bookComments: true,
  price: true,
  ISBN: true,
  editionNo: true,
  state: true,
  pageCount: true,
  publishTime: true,
  isActive: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewBookSheet = () => {
  const { IsBookOpen, OnCloseBook } = useNewBook();

  const mutation = useCreateBook();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        OnCloseBook();
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    });
  };

  return (
    <div className="overflow-y-auto">
      <Sheet open={IsBookOpen} onOpenChange={OnCloseBook}>
        <SheetContent className="space-y-4 " side={"bottom"} dir="rtl">
          <SheetHeader>
            <SheetTitle
              style={{
                textAlign: "right",
              }}
            >
              کتاب جدید
            </SheetTitle>
            <SheetDescription
              style={{
                textAlign: "right",
              }}
            >
              جزییات
            </SheetDescription>
          </SheetHeader>
          <BookForm onSubmit={onSubmit} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
