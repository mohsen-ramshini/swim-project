"use client";
import React, { useEffect, useMemo, useState } from "react";
import HeadArticle from "./HeadArticle";
import ArticleInterface from "./ArticleInterface";
import { useGetArticles as useGetArticlesAPI } from "@/features/article/api/use-get-articles";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { insertArticleSchema } from "@/db/schema";
import { handlers } from "@/lib/mock";
import { z } from "zod";

type ArticleType = z.infer<typeof insertArticleSchema>;
const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);
  return matches;
};

const Articles = () => {
  const [fetchedArticles, setFetchedArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isMobile = useMediaQuery("(max-width: 1280px)");
  const [headArticles, setHeadArticles] = useState<ArticleType[]>([]);
  const [middleArticle, setMiddleArticle] = useState<ArticleType[]>([]);
  const [otherArticles, setOtherArticles] = useState<ArticleType[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        let articles: ArticleType[] = [];

        if (USE_MOCK) {
          const res = await handlers.articles.getArticles();
          articles = res.data ?? [];
        } else {
          const res = await useGetArticlesAPI();
          // articles = res.data ?? [];
        }

        setFetchedArticles(articles);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const normalizedArticles = useMemo(() => {
    return fetchedArticles.map((article) => ({
      ...article,
      createdAt: article.createdAt,
      modifiedAt: article.modifiedAt ? new Date(article.modifiedAt) : undefined,
      publishTime: article.publishTime
        ? new Date(article.publishTime)
        : undefined,
    }));
  }, [fetchedArticles]);

  useEffect(() => {
    if (isMobile) {
      setOtherArticles(normalizedArticles.slice(0, 4));
      setHeadArticles([]);
      setMiddleArticle([]);
    } else {
      setHeadArticles(normalizedArticles.slice(0, 1));
      setMiddleArticle(normalizedArticles.slice(1, 2));
      setOtherArticles(normalizedArticles.slice(2));
    }
  }, [isMobile, normalizedArticles]);

  if (error)
    return (
      <div className="text-red-500">خطا در دریافت مقالات: {error.message}</div>
    );

  return (
    <section className="flex flex-col items-center w-full min-h-screen p-4 mb-10">
      <h2 className="text-black text-3xl sm:text-4xl lg:text-5xl font-extrabold my-5 text-center">
        آخرین مقالات
      </h2>

      {isLoading ? (
        <div className="mx-auto lg:w-[1080px] my-10 flex items-center justify-center h-[500px]">
          <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-center mb-5">
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-6 py-3 text-lg w-full sm:w-auto"
              onClick={() => router.push("/articles")}
            >
              <ArrowLeftCircle /> مشاهده همه
            </Button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full p-4 items-stretch">
            <div className="w-full p-4 space-y-7 text-right sm:text-center">
              {otherArticles.map((art) => (
                <ArticleInterface key={art.id} data={art} />
              ))}
            </div>

            <div className="hidden xl:block w-full p-4 space-y-4 text-right sm:text-center">
              {headArticles.map((art) => (
                <HeadArticle key={art.id} data={art} />
              ))}
              {middleArticle.map((art) => (
                <ArticleInterface key={art.id} data={art} />
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Articles;
