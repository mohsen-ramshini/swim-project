import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ArticlesList from "./components/ArticlesList";

const page = () => {
  return (
    <section className="w-full h-full">
      <ArticlesList />
    </section>
  );
};

export default page;
