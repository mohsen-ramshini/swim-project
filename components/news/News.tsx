"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import NewsInterface from "./NewsInterface";
import { useRouter } from "next/navigation";
import { useGetNews as useGetNewsAPI } from "@/features/news/api/use-get-news";
import { handlers } from "@/lib/mock";
import type { NewsType } from "@/db/schema/news/news"; // اگر نداری برات می‌نویسم

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

const News = () => {
  const router = useRouter();

  const [news, setNews] = useState<NewsType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // ==========================
  //     FETCHING (MOCK / API)
  // ==========================
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        let fetchedNews: NewsType[] = [];

        if (USE_MOCK) {
          const res = await handlers.news.getNews();
          fetchedNews = (res.data as NewsType[]) ?? [];
        } else {
          const res = await useGetNewsAPI();
          // fetchedNews = res.data ?? [];
        }

        setNews(fetchedNews);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // ==========================
  //     NORMALIZE DATA
  // ==========================
  const normalizedNews = useMemo(() => {
    return news.map((item) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      modifiedAt: item.modifiedAt ? new Date(item.modifiedAt) : undefined,
      publishTime: item.publishDate ? new Date(item.publishDate) : undefined,
      date: item.date ? new Date(item.date) : undefined,
      publishDate: item.publishDate ? new Date(item.publishDate) : undefined,
    }));
  }, [news]);

  // ==========================
  //       SPLIT SLIDER / LIST
  // ==========================
  const sliderItems = normalizedNews.slice(0, 4);
  const items = normalizedNews.slice(4);

  // ==========================
  //         ERROR UI
  // ==========================
  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        خطا در دریافت اخبار: {error.message}
      </div>
    );

  return (
    <section className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col justify-center mt-5">
        <h2 className="text-5xl font-extrabold text-center my-5">اخبار</h2>
        <div className="w-full flex justify-center items-center">
          <Button variant={"ghost"} onClick={() => router.push("/news")}>
            <ArrowLeftCircle />
            دیدن همه
          </Button>
        </div>
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-4/5 h-1/2">
          <NewsInterface news={sliderItems} slider={true} />
        </div>
        <div className="w-full h-1/2 my-5">
          <NewsInterface news={items} slider={false} />
        </div>
      </div>
    </section>
  );
};

export default News;
