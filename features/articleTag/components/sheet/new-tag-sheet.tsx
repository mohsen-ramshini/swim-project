// import { z } from "zod";
// import { useNewTag } from "@/features/articleTag/hook/use-new-tag";
// import { ArticleTagForm } from "@/features/articleTag/components/form/ArticleTagForm";
// import { useCreateTag } from "@/features/articleTag/api/use-create-tag";

// import { insertArticleTagSchema } from "@/db/schema/articleTag";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useEffect } from "react";

// const formSchema = insertArticleTagSchema.pick({
//   title: true,
//   slug: true,
//   isActive: true,
// });

// type FormValues = z.input<typeof formSchema>;

// export const NewTagSheet = () => {
//   const { isTagOpen, onCloseTag } = useNewTag();

//   useEffect(() => {
//     console.log(`sheet is open tag:${isTagOpen}`);
//   }, [isTagOpen]);

//   useEffect(() => {
//     console.log(`tag is getting rendered`);
//   }, []);

//   const mutation = useCreateTag();

//   const onSubmit = (values: FormValues) => {
//     mutation.mutate(values, {
//       onSuccess: () => {
//         onCloseTag();
//       },
//     });
//   };

//   return (
//     <Sheet open={true} onOpenChange={onCloseTag}>
//       <SheetContent className="space-y-4">
//         <SheetHeader>
//           <SheetTitle>New Tag</SheetTitle>
//           <SheetDescription>Edit</SheetDescription>
//         </SheetHeader>
//         <ArticleTagForm onSubmit={onSubmit} />
//       </SheetContent>
//     </Sheet>
//   );
// };
import { insertArticleTagSchema } from "@/db/schema/article/articleTag";
import { useNewTag } from "@/features/articleTag/hook/use-new-tag";
import { useCreateTag } from "@/features/articleTag/api/use-create-tag";
import { ArticleTagForm } from "@/features/articleTag/components/form/ArticleTagForm";
import { NewItemSheet } from "@/features/article/components/NewItemSheet";

const tagFormSchema = insertArticleTagSchema.pick({
  title: true,
  slug: true,
  isActive: true,
});

export const NewTagSheet: React.FC = () => {
  const { isTagOpen, onCloseTag } = useNewTag();

  return (
    <NewItemSheet
      isOpen={isTagOpen}
      onClose={onCloseTag}
      formSchema={tagFormSchema}
      useMutation={useCreateTag}
      FormComponent={ArticleTagForm}
      title="New Tag"
      description="Edit Tag Details"
    />
  );
};
