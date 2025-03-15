import React from "react";
import ArticleTable from "./table/ArticleTable";
import { useGetArticlesAndCategories } from "../api/use-get-cat-and-art-";

const Article = () => {
  // fetch categories over page load
  const { articlesQuery, categoriesQuery } = useGetArticlesAndCategories();

  return (
    <div className="overflow-y-auto">
      <ArticleTable />
    </div>
  );
};

export default Article;
