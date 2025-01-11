import { insertArticleSchema } from "@/db/schema/article";
import { useNewArticle } from "@/features/article/hook/use-new-article";
import { useCreateAccount } from "@/features/article/api/use-create-article";
import { ArticleForm } from "@/features/article/components/form/ArticleForm";
import { NewItemSheet } from "@/features/article/components/NewItemSheet";

const articleFormSheet = insertArticleSchema.pick({
  title: true,
  slug: true,
  isActive: true,
});

export const NewArticleSheet: React.FC = () => {
  const { isArticleOpen, onCloseArticle } = useNewArticle();

  return (
    <NewItemSheet
      isOpen={isArticleOpen}
      onClose={onCloseArticle}
      formSchema={articleFormSheet}
      useMutation={useCreateAccount}
      FormComponent={ArticleForm}
      title="ایجاد مقاله جدید"
      description="جزییات"
    />
  );
};
