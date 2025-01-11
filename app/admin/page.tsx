"use client";

import ArticleCommentsForm from "@/features/articleComments/components/ArticleCommentsForm";
import ArticleTag from "@/features/articleTag/components/ArticleTag";
import AuthorForm from "@/features/author/components/AuthorForm";
import EditorForm from "@/features/editor/components/EditorForm";
import TranslatorForm from "@/features/translator/components/TranslatorForm";
import { useAppContext } from "@/providers/Appcontext";
import ArticleCategory from "@/features/articleCategory/components/ArticleCategory";
import Article from "@/features/article/components/Article";

export default function BlogForm() {
  const { activePage } = useAppContext();

  const renderActivePage = () => {
    switch (activePage) {
      case "article":
        return <Article />;
      case "articleCategory":
        return <ArticleCategory />;
      case "ArticleComment":
        return <ArticleCommentsForm />;
      case "articleTag":
        return <ArticleTag />;
      case "author":
        return <AuthorForm />;
      case "editor":
        return <EditorForm />;
      case "translator":
        return <TranslatorForm />;
      default:
        return <div className="text-center text-red-500">صفحه پیدا نشد</div>;
    }
  };

  return <section dir="rtl">{renderActivePage()}</section>;
}
