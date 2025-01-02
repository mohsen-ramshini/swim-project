"use client";

import ArticleForm from "@/features/article/components/ArticleForm";
import ArticleCommentsForm from "@/features/articleComments/components/ArticleCommentsForm";
import ArticleTagForm from "@/features/articleTag/components/ArticleTagForm";
import AuthorForm from "@/features/author/components/AuthorForm";
import EditorForm from "@/features/editor/components/EditorForm";
import TranslatorForm from "@/features/translator/components/TranslatorForm";
import { useAppContext } from "@/providers/Appcontext";
import ArticleCategory from "@/features/articleCategory/components/ArticleCategory";

export default function BlogForm() {
  const { activePage } = useAppContext();

  const renderActivePage = () => {
    switch (activePage) {
      case "article":
        return <ArticleForm />;
      case "articleCategory":
        return <ArticleCategory />;
      case "ArticleComment":
        return <ArticleCommentsForm />;
      case "articleTag":
        return <ArticleTagForm />;
      case "author":
        return <AuthorForm />;
      case "editor":
        return <EditorForm />;
      case "translator":
        return <TranslatorForm />;
      default:
        return <div className="text-center text-red-500">Page Not Found</div>;
    }
  };

  return (
    <section className="min-h-screen w-full flex flex-col bg-white shadow rounded-lg p-6">
      {renderActivePage()}
    </section>
  );
}
