// import { z } from "zod";
// import { useNewCategory } from "@/features/articleCategory/hook/use-new-category";
// import { ArticleCategoryForm } from "@/features/articleCategory/components/form/ArticleCatForm";
// import { useCreateCategory } from "../../api/use-create-article-cat";

// import { insertArticleCategoriesSchema } from "@/db/schema/articleCategory";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
// } from "@/components/ui/sheet";
// import { useEffect } from "react";

// const formSchema = insertArticleCategoriesSchema.pick({
//   title: true,
//   slug: true,
//   isActive: true,
// });

// type FormValues = z.input<typeof formSchema>;

// export const NewCategorySheet = () => {
//   const { isCategoryOpen, onCloseCategory } = useNewCategory();

//   useEffect(() => {
//     console.log(`sheet is open :${isCategoryOpen}`);
//   }, [isCategoryOpen]);

//   const mutation = useCreateCategory();

//   const onSubmit = (values: FormValues) => {
//     mutation.mutate(values, {
//       onSuccess: () => {
//         onCloseCategory();
//       },
//     });
//   };

//   return (
//     <Sheet open={isCategoryOpen} onOpenChange={onCloseCategory}>
//       <SheetContent className="space-y-4">
//         <SheetHeader>
//           <SheetTitle>New Category</SheetTitle>
//           <SheetDescription>Edit</SheetDescription>
//         </SheetHeader>
//         <ArticleCategoryForm onSubmit={onSubmit} />
//       </SheetContent>
//     </Sheet>
//   );
// };
import { insertArticleCategoriesSchema } from "@/db/schema/article/articleCategory";
import { useNewCategory } from "@/features/articleCategory/hook/use-new-category";
import { useCreateCategory } from "@/features/articleCategory/api/use-create-article-cat";
import { ArticleCategoryForm } from "@/features/articleCategory/components/form/ArticleCatForm";
import { NewItemSheet } from "@/features/article/components/NewItemSheet";

const categoryFormSchema = insertArticleCategoriesSchema.pick({
  title: true,
  slug: true,
  isActive: true,
});

export const NewCategorySheet: React.FC = () => {
  const { isCategoryOpen, onCloseCategory } = useNewCategory();

  return (
    <NewItemSheet
      isOpen={isCategoryOpen}
      onClose={onCloseCategory}
      formSchema={categoryFormSchema}
      useMutation={useCreateCategory}
      FormComponent={ArticleCategoryForm}
      title="ایجاد دسته بندی جدید"
      description="جزییات"
    />
  );
};
