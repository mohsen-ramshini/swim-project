import { z } from "zod";
import { useNewCreator } from "@/features/creator/hook/use-new-creator";
import { CreatorForm } from "@/features/creator/component/form/CreatorForm";
import { useCreateCreator } from "@/features/creator/api/use-create-creator";

import { insertCreatorSchema } from "@/db/schema/article/creator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect } from "react";

const formSchema = insertCreatorSchema.pick({
  id: true,
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCreatorSheet = () => {
  const { isCreatorOpen, onCloseCreator } = useNewCreator();

  useEffect(() => {
    console.log(`sheet is open :${isCreatorOpen}`);
  }, [isCreatorOpen]);

  const mutation = useCreateCreator();

  const roleMapping: Record<string, number> = {
    author: 1,
    editor: 2,
    translator: 3,
  };

  const onSubmit = (values: FormValues) => {
    console.log("Submitting values:", values);

    mutation.mutate(values, {
      onSuccess: () => {
        onCloseCreator();
        console.log("Success article sent:", values);
      },
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    });
  };

  return (
    <div className="overflow-y-auto">
      <Sheet open={isCreatorOpen} onOpenChange={onCloseCreator}>
        <SheetContent className="space-y-4 " side={"left"} dir="rtl">
          <SheetHeader>
            <SheetTitle
              style={{
                textAlign: "right",
              }}
            >
              پدید اورنده جدید
            </SheetTitle>
            <SheetDescription
              style={{
                textAlign: "right",
              }}
            >
              جزییات
            </SheetDescription>
          </SheetHeader>
          <CreatorForm onSubmit={onSubmit} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
