"use client";
import React, { useEffect, useMemo, useState } from "react";
import HeadArticle from "./HeadArticle";
import ArticleInterface from "./ArticleInterface";
import { useGetArticles } from "@/features/article/api/use-get-articles";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { insertArticleSchema } from "@/db/schema";
import { z } from "zod";

type ArticleInterface = z.infer<typeof insertArticleSchema>;

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
  const { data: fetchedArticles = [], isLoading } = useGetArticles();
  const isMobile = useMediaQuery("(max-width: 1280px)");
  const [headArticles, setHeadArticles] = useState<ArticleInterface[]>([]);
  const [middleArticle, setMiddleArticle] = useState<ArticleInterface[]>([]);
  const [otherArticles, setOtherArticles] = useState<ArticleInterface[]>([]);

  const router = useRouter();

  const normalizedArticles = useMemo(() => {
    if (!fetchedArticles.length) return [];

    return fetchedArticles.map((article) => ({
      ...article,
      createdAt: new Date(article.createdAt),
      modifiedAt: article.modifiedAt ? new Date(article.modifiedAt) : undefined,
      publishTime: article.publishTime
        ? new Date(article.publishTime)
        : undefined,
    }));
  }, [JSON.stringify(fetchedArticles)]);

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

  return (
    <section className="flex flex-col items-center w-full min-h-screen p-4 mb-10">
      {/* Heading */}
      <h2 className="text-black text-3xl sm:text-4xl lg:text-5xl font-extrabold my-5 text-center">
        آخرین مقالات
      </h2>

      {/* Loading State */}
      {isLoading ? (
        <div className="mx-auto lg:w-[1080px] my-10">
          <div className="border-none">
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* View All Button */}
          <div className="w-full flex justify-center mb-5">
            <Button
              variant="ghost"
              className="flex items-center gap-2 px-6 py-3 text-lg w-full sm:w-auto"
              onClick={() => router.push("/articles")}
            >
              <ArrowLeftCircle /> مشاهده همه
            </Button>
          </div>

          {/* Articles Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full p-4 items-stretch">
            {/* Other Articles */}
            <div className="w-full p-4 space-y-7 text-right sm:text-cente">
              {otherArticles.map((art) => (
                <ArticleInterface key={art.id} data={art} />
              ))}
            </div>

            {/* Main Article Section */}
            <div className="hidden xl:block w-full p-4 space-y-4 text-right sm:text-cente">
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
