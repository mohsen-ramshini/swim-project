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

const formSchema = insertCreatorSchema
  .pick({
    id: true,
    name: true,
  })
  .extend({
    roles: z.array(z.string()).default([]), // اضافه کردن roles
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
    // اطمینان از اینکه roles همیشه یک آرایه باشد
    const roles = values.roles ?? []; // اگر roles undefined بود، بهش یک آرایه خالی بده
    const roleMapping: Record<string, number> = {
      author: 1,
      editor: 2,
      translator: 3,
    };

    const formattedValues = {
      ...values,
      roles: roles.map((role) => ({
        type: role as "author" | "editor" | "translator",
        role_id: roleMapping[role],
      })),
    };

    console.log("Submitting values:", formattedValues);

    mutation.mutate(formattedValues, {
      onSuccess: () => {
        onCloseCreator();
        console.log("Success article sent:", formattedValues);
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
