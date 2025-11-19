"use client";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { Skeleton } from "@/components/ui/skeleton";
import useContentParser from "@/hooks/use-content-parser";
import Profile from "@/components/articles/Profile";
import SingleArticleInterface from "@/components/articles/SingleArticleInterface";
import LoadingComponent from "@/components/appLayout/LoadingComponent";
import Comment from "@/components/comment/Comment";

import { useGetCategories } from "@/features/articleCategory/api/use-get-categories";
import { useGetCreator } from "@/features/creator/api/use-get-creator";
import { handlers } from "@/lib/mock";

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

interface Props {
  slug: string;
}

interface Article {
  id: number;
  articleType: number;
  title: string;
  slug: string;
  thumbnail: string | null;
  excerpt: string;
  content: string;
  categoryId: number;
  reference: string;
  publishTime: Date;
  isActive: boolean;
  createdBy: number;
  createdAt: Date;
  modifiedBy: number;
  modifiedAt: Date;
  translatorId?: number;
}

const defaultArticle: Article = {
  id: 0,
  articleType: 0,
  title: "",
  slug: "",
  thumbnail: null,
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
  const [article, setArticle] = useState<Article | null>(null);
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const { data: categories } = useGetCategories();

  const normalizeArticle = (data: any): Article => ({
    id: data.id ?? 0,
    articleType: data.articleType ?? 0,
    title: data.title ?? "",
    slug: data.slug ?? "",
    thumbnail: data.thumbnail ?? null,
    excerpt: data.excerpt ?? "",
    content: data.content ?? "",
    categoryId: data.categoryId ?? 0,
    reference: data.reference ?? "",
    publishTime: data.publishTime ? new Date(data.publishTime) : new Date(),
    isActive: data.isActive ?? true,
    createdBy: data.createdBy ?? 0,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    modifiedBy: data.modifiedBy ?? 0,
    modifiedAt: data.modifiedAt ? new Date(data.modifiedAt) : new Date(),
    translatorId: data.translatorId,
  });

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        let res: any = null;

        if (USE_MOCK) {
          res = await handlers.articles.getArticleBySlug(slug);
          if (!res?.data) {
            setArticle(null);
            return;
          }
          setArticle(normalizeArticle(res.data));
        } else {
          const apiRes = await fetch(`/api/articles/${slug}`);
          if (!apiRes.ok) throw new Error("Article not found");
          const data = await apiRes.json();
          setArticle(normalizeArticle(data));
        }

        // Set category title
        const catTitle = categories?.find(
          (c) => c.id === res?.data?.categoryId
        )?.title;
        setCategory(catTitle ?? "");
      } catch (error) {
        console.error(error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, categories]);

  const excerpt = useContentParser(article?.excerpt ?? "", false);
  const content = useContentParser(article?.content ?? "", false);

  // Fetch author
  const { data: authorData, isLoading: authorLoading } = useGetCreator(
    article?.createdBy?.toString()
  );

  if (loading) return <LoadingComponent />;
  if (!article) return notFound();

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
          <Profile
            fullName={
              authorLoading ? "در حال بارگذاری..." : authorData?.name ?? "ناشناس"
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
              categoryId={article.categoryId}
              mustRemove={article}
            />
          </div>
        </div>
        {article.id !== 0 && <Comment articleID={article.id} />}
      </div>
    </section>
  );
}
