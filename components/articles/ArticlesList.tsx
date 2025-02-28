import React from "react";
import ArticlePagination from "./ArticlePagination";

const ArticlesList = () => {
  return (
    <section className="w-full h-full flex flex-col my-10">
      <h1 className="mt-14 mr-16 text-black font-extrabold text-5xl text-right ">
        مقالات
      </h1>
      <div className="bg-white">
        <ArticlePagination />
      </div>
    </section>
  );
};

export default ArticlesList;
