"use client";
import { useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import useContentParser from "@/hooks/use-content-parser";

import Profile from "@/components/articles/Profile";
import SingleArticleInterface from "@/components/articles/SingleArticleInterface";
import LoadingComponent from "@/components/appLayout/LoadingComponent";
import Comment from "@/components/comment/Comment";

import { useGetArticleBySlug } from "@/features/article/api/use-get-article-by-slug";
import { useGetCategories } from "@/features/articleCategory/api/use-get-categories";
import { useGetCreator } from "@/features/creator/api/use-get-creator";

interface Props {
  slug: string;
}

const defaultArticles = {
  id: 0,
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
  const [articleId, setArticleId] = useState(0);
  const [category, setCategory] = useState<string>();
  const {
    data: article = defaultArticles,
    isLoading,
    error,
  } = useGetArticleBySlug(slug);

  const rawArticle = useMemo(
    () => (article ? normalizeArticleData(article) : defaultArticles),
    [article]
  );

  const categoryId = article?.categoryId ?? 0;
  const { data: categories } = useGetCategories();
  const excerpt = useContentParser(article?.excerpt ?? "", false);
  const content = useContentParser(article?.content ?? "", false);

  // Fetch author, translator, and editor data dynamically
  const { data: authorData, isLoading: authorLoading } = useGetCreator(
    article?.createdBy?.toString()
  );
  const { data: translatorData, isLoading: translatorLoading } = useGetCreator(
    article?.createdBy?.toString() // Adjust if you have specific fields for translator
  );
  const { data: editorData, isLoading: editorLoading } = useGetCreator(
    article?.createdBy?.toString() // Adjust if you have specific fields for editor
  );

  useEffect(() => {
    setCategory(
      categories?.find((cat) => cat.id === article?.categoryId)?.title
    );
  }, [categories, article]);

  useEffect(() => {
    if (article.id !== 0) {
      setArticleId(article.id);
    }
  }, [article]);

  function normalizeArticleData(article: any) {
    return {
      ...article,
      publishTime: article.publishTime
        ? new Date(article.publishTime)
        : new Date(),
    };
  }

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (error || !article) return notFound();

  return (
    <section className="w-full mt-20">
      <div className="w-full pt-20 text-center m-auto flex flex-col items-center min-h-screen">
        <div className="w-3/4 lg:w-2/3 flex flex-col-reverse ">
          <div className="w-full flex justify-center">
            <div className="w-24 h-12 lg:w-32 lg:h-14 flex justify-center items-center rounded-md bg-slate-300 opacity-80 my-5 font-semibold text-md lg:text-sm ">
              {category}
            </div>
          </div>
          <h1 className="font-extrabold text-3xl lg:text-5xl mt-16">
            {article.title}
          </h1>
          <div className="w-full flex justify-center">
            <Skeleton className="h-[270px] w-[586px]  lg:w-[960px] lg:h-[450px]" />
          </div>
        </div>
        <div className="w-2/3">
          {/* Display author, translator, and editor profiles dynamically */}
          <Profile
            fullName={
              authorLoading
                ? "در حال بارگذاری..."
                : authorData?.name ?? "ناشناس"
            }
            role="نویسنده"
            occupation="استاد دانشگاه"
            size="lg"
          />
          <div className="text-right font-bold text-2xl lg:text-3xl my-5 leading-[1.5]">
            {excerpt}
          </div>
          <div className="text-right font-semibold text-md lg:text-lg">
            {content}
          </div>
        </div>
        <div className="w-2/3">
          <h3 className="text-xl font-semibold my-20">مقالات مرتبط</h3>
          <div className="mb-20">
            <SingleArticleInterface
              categoryId={categoryId}
              mustRemove={rawArticle}
            />
          </div>
        </div>
        {articleId !== 0 && <Comment articleID={articleId} />}
      </div>
    </section>
  );
}
