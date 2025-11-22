"use client";
import React, { useEffect, useMemo, useState } from "react";
import HeadArticle from "./HeadArticle";
import ArticleInterface from "./ArticleInterface";
import { useGetArticles as useGetArticlesAPI } from "@/features/article/api/use-get-articles";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { insertArticleSchema, insertCreatorSchema } from "@/db/schema";
import { handlers } from "@/lib/mock";
import { z } from "zod";
import Profile from "./Profile";

type ArticleType = z.infer<typeof insertArticleSchema>;
type CreatorType = z.infer<typeof insertCreatorSchema>;

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

  const loadingArray = Array(4).fill({});

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
      setOtherArticles(normalizedArticles.slice(2, 6));
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
      <div className="w-full flex justify-center mb-5">
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-6 py-3 text-lg w-full sm:w-auto"
          onClick={() => router.push("/articles")}
        >
          <ArrowLeftCircle /> مشاهده همه
        </Button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 w-full p-4">
        {/* ستون اول */}
        <div className="flex-1 flex flex-col gap-7 p-4 text-right sm:text-center">
          {isLoading
            ? loadingArray.map((_, i) => (
                <aside
                  key={i}
                  className="flex flex-col lg:flex-row-reverse border-b-2 pb-5"
                >
                  {/* تصویر Skeleton */}
                  <div className="w-full lg:w-1/3 mb-5 ml-5">
                    <div className="w-full h-[200px] lg:w-full lg:h-[110px] mb-5 rounded-sm">
                      <Skeleton className="w-full h-full" />
                    </div>
                    <Profile
                      fullName=""
                      isLoading={true}
                      role=""
                      occupation=""
                      size="sm"
                    />
                  </div>

                  {/* متن و عنوان Skeleton سمت راست */}
                  <div className="w-full lg:w-2/3 pb-10 flex flex-col gap-2 items-end">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </aside>
              ))
            : otherArticles.map((art) => (
                <div key={art.id} className="flex-1">
                  <ArticleInterface data={art} isLoading={isLoading} />
                </div>
              ))}
        </div>

        {/* ستون دوم */}
        <div className="hidden xl:flex-1 xl:flex xl:flex-col gap-4 p-4 text-right sm:text-center">
          {isLoading ? (
            <>
              {/* HeadArticle Skeleton */}
              <aside className="flex-1">
                <div className="w-full h-[200px] xl:h-[455px] rounded-sm">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="flex flex-col lg:flex-row-reverse w-full mt-5 px-4">
                  {/* عنوان و پروفایل */}
                  <div className="lg:w-1/2 flex flex-col items-end text-right">
                    <Skeleton className="h-6 w-3/4 mb-4" />{" "}
                    {/* Skeleton برای عنوان */}
                    <div className="flex justify-end">
                      <Profile
                        fullName=""
                        isLoading={true}
                        size="lg"
                        role=""
                        occupation=""
                      />
                    </div>
                  </div>

                  {/* متن Skeleton */}
                  <div className="lg:w-1/2 text-right mt-4 lg:mt-0 flex flex-col gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />{" "}
                    {/* آخرین خط کمی کوتاه‌تر */}
                  </div>
                </div>
              </aside>

              {/* MiddleArticle Skeleton */}
              <aside className="flex flex-col lg:flex-row-reverse border-b-2 pb-5">
                <div className="w-full lg:w-1/3 mb-5 ml-5">
                  <div className="w-full h-[200px] lg:w-full lg:h-[110px] mb-5 rounded-sm">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <Profile
                    fullName=""
                    isLoading={true}
                    role=""
                    occupation=""
                    size="sm"
                  />
                </div>

                <div className="w-full lg:w-2/3 pb-10 flex flex-col gap-2 items-end">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </aside>
            </>
          ) : (
            <>
              {/* headArticles */}
              {headArticles.length > 0 && (
                <div className="flex-1">
                  <HeadArticle data={headArticles[0]} isLoading={false} />
                </div>
              )}

              {/* middleArticle */}
              {middleArticle.length > 0 && (
                <div className="flex flex-col flex-1 justify-end">
                  <ArticleInterface data={middleArticle[0]} isLoading={false} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Articles;
