"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import NewsInterface from "./NewsInterface";
import { useRouter } from "next/navigation";
import { useGetNews } from "@/features/news/api/use-get-news";

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

const News = () => {
  const router = useRouter();
  const { data: fetchedNews = [], isLoading } = useGetNews();
  const [sliderItems, setSliderItems] = useState<typeof normalizedNews>([]);
  const [items, setItems] = useState<typeof normalizedNews>([]);

  const normalizedNews = useMemo(() => {
    return (
      fetchedNews?.map((news) => ({
        ...news,
        createdAt: new Date(news.createdAt),
        modifiedAt: news.modifiedAt ? new Date(news.modifiedAt) : undefined,
        publishTime: news.publishDate ? new Date(news.publishDate) : undefined,
        date: news.date ? new Date(news.date) : undefined,
        publishDate: news.publishDate ? new Date(news.publishDate) : undefined,
      })) || []
    );
  }, [fetchedNews]);

  useEffect(() => {
    if (normalizedNews.length > 0) {
      setSliderItems(normalizedNews.slice(0, 4));
      setItems(normalizedNews.slice(4));
    }
  }, [normalizedNews]);

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
