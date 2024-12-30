"use client";

import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
import ArticleForm from "@/features/article/components/ArticleForm";
import ArticleCategoryForm from "@/features/articleCategory/components/ArticleCatForm";
import ArticleCommentsForm from "@/features/articleComments/components/ArticleCommentsForm";
import ArticleTagForm from "@/features/articleTag/components/ArticleTagForm";
import AuthorForm from "@/features/author/components/AuthorForm";
import EditorForm from "@/features/editor/components/EditorForm";
import TranslatorForm from "@/features/translator/components/TranslatorForm";
import { useAppContext } from "@/providers/Appcontext";

export default function BlogForm() {
  const { activePage } = useAppContext();

  const renderActivePage = () => {
    switch (activePage) {
      case "article":
        return <ArticleForm />;
      case "articleCategory":
        return <ArticleCategoryForm />; // passed
      case "ArticleComment":
        return <ArticleCommentsForm />;
      case "articleTag":
        return <ArticleTagForm />; // passed
      case "author":
        return <AuthorForm />; // passed
      case "editor":
        return <EditorForm />; // passed
      case "translator":
        return <TranslatorForm />; // passed
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <section className="min-h-screen w-full  flex flex-col">
      {/* <Navbar setActiveSection={setActivePage} /> */}
      {renderActivePage()}
    </section>
  );
}
