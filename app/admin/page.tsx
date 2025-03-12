"use client";

import ArticleCommentsForm from "@/features/articleComments/components/ArticleCommentsForm";
import ArticleTag from "@/features/articleTag/components/ArticleTag";
import { useAppContext } from "@/providers/Appcontext";
import ArticleCategory from "@/features/articleCategory/components/ArticleCategory";
import Article from "@/features/article/components/Article";
import Book from "@/features/book/component/book";
import News from "@/features/news/components/News";
import Creator from "@/features/creator/component/Creator";

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
      case "book":
        return <Book />;
      case "news":
        return <News />;
      case "creator":
        return <Creator />;
      default:
        return <div className="text-center text-red-500">صفحه پیدا نشد</div>;
    }
  };

  return (
    <section dir="rtl" className="overflow-y-auto">
      {renderActivePage()}
    </section>
  );
}
