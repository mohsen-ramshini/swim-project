import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ArticlesList from "../components/articles/ArticlesList";

const page = () => {
  return (
    <section className="w-full h-full">
      <ArticlesList />
    </section>
  );
};

export default page;
