"use client";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Profile from "@/components/articles/Profile";
import SingleArticleInterface from "@/components/articles/SingleArticleInterface";
import useContentParser from "@/hooks/use-content-parser";
import { useGetArticleBySlug } from "@/features/article/api/use-get-article-by-slug";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";
import { useGetArticlesByCategory } from "@/features/article/api/use-get-artilce-by-category";
import { useEffect, useMemo, useState } from "react";
import { UseGetCategory } from "@/features/articleCategory/api/use-get-category";
import { useGetCategories } from "@/features/articleCategory/api/use-get-categories";
import { useGetArticles } from "@/features/article/api/use-get-articles";
import LoadingComponent from "../appLayout/LoadingComponent";

interface Props {
  slug: string;
}

const defaultArticles = {
  articleType: 0,
  title: "",
  slug: "",
  thumbnail: "",
  excerpt: "",
  content: "",
  categoryId: 0,
  reference: "",
  publishTime: new Date(),
  isActive: true,
  createdBy: 0,
  createdAt: new Date(),
  modifiedBy: 0,
  modifiedAt: new Date(),
};
export default function ArticleContent({ slug }: Props) {
  const [category, setCategory] = useState<string>();
  const { data: fetchedArticles = [] } = useGetArticles();
  const {
    data: article = defaultArticles,
    isLoading,
    error,
  } = useGetArticleBySlug(slug);

  const categoryId = article?.categoryId ?? 0;
  const { data: categories } = useGetCategories();
  const excerpt = useContentParser(article?.excerpt ?? "", false);
  const content = useContentParser(article?.content ?? "", false);

  console.log(`fetched article ${article}`);
  console.log("Slug received in ArticlePage:", slug);

  useEffect(() => {
    setCategory(
      categories?.find((cat) => cat.id === article?.categoryId)?.title
    );
    console.log(`related articles : ${categoryId}`);
  }, [categories, article]);

  if (isLoading) {
    <LoadingComponent />;
  }
  if (error || !article) return notFound();

  return (
    <section className="w-full mt-20">
      <div className="w-full pt-20 text-center m-auto flex flex-col items-center">
        <div className="w-3/4 lg:w-2/3 flex flex-col-reverse ">
          <div className="w-full flex justify-center">
            <div className="w-24 h-12 lg:w-32 lg:h-14 flex justify-center items-center rounded-md bg-slate-300 opacity-80 my-5 font-semibold text-md lg:text-sm ">
              {category}
            </div>
          </div>
          <h1 className="font-extrabold text-3xl lg:text-5xl mt-16">
            {article.title}
          </h1>
          <div className="w-full h-[200px] lg:w-[960px] lg:h-[450px] m-auto">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
        <div className="w-2/3">
          <Profile fullName="محسن رامشینی" size="lg" />
          <div className="text-right font-bold text-2xl lg:text-3xl my-5">
            {excerpt}
          </div>
          <div className="text-right font-semibold text-md lg:text-lg">
            {content}
          </div>
        </div>
        <div className="w-2/3">
          <h3 className="text-xl font-semibold my-20">مقالات مرتبط</h3>
          <div className="mb-20">
            <SingleArticleInterface categoryId={categoryId} />
          </div>
        </div>
      </div>
    </section>
  );
}
