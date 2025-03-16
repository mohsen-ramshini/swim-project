"use client";
import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { insertNewsSchema } from "@/db/schema/news/news";
import NewsContent from "./NewsContent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useParsedContent from "@/hooks/use-content-parser";
import Content from "./Content";

type News = z.infer<typeof insertNewsSchema>;

interface Props {
  news: News[];
  slider: boolean;
  interval?: number; // مدت زمان حرکت خودکار (میلی‌ثانیه)
}

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

const chunkArray = (arr: News[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const NewsInterface: React.FC<Props> = ({ news, slider, interval = 3000 }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const itemsPerSlide = 1;
  const groupedNews = chunkArray(news, itemsPerSlide);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slider) return;

    const timer = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex + 1 >= groupedNews.length ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [groupedNews.length, slider, interval]);

  if (!slider) {
    return (
      <aside className="w-full h-auto flex flex-col items-center">
        <div className="w-full max-w-5xl">
          {news.map((newsItem) => (
            <NewsContent news={newsItem} key={newsItem.id} />
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full h-auto flex flex-col">
      <Carousel className="w-full h-auto max-w-5xl m-auto">
        <CarouselContent
          className="w-full h-auto lg:h-[550px]"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {groupedNews.map((newsGroup, index) => (
            <CarouselItem
              key={`group-${index}`}
              className={cn(
                "flex justify-center items-center h-auto gap-4 px-2",
                isMobile ? "w-full flex-col" : "w-1/3"
              )}
            >
              {newsGroup.map((newsItem) => (
                <Link
                  key={newsItem.id}
                  href={`/news/${newsItem.slug}`}
                  className="w-full max-w-3xl p-2"
                >
                  <Card className="w-full h-auto shadow-md rounded-lg overflow-hidden">
                    <CardContent className="flex flex-col items-center p-4">
                      <div className="w-full h-48 md:h-64 lg:h-72">
                        <Skeleton className="w-full h-full rounded-md" />
                      </div>
                      <div className="w-full text-right mt-4 font-semibold text-lg md:text-xl">
                        {newsItem.title}
                      </div>
                      <div className="w-full text-right mt-4 font-semibold text-xs md:text-sm">
                        <Content data={newsItem.content.slice(0, 120)} />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          onClick={() =>
            setActiveIndex((prevIndex) =>
              prevIndex + 1 >= groupedNews.length ? 0 : prevIndex + 1
            )
          }
        />
        <CarouselNext
          onClick={() =>
            setActiveIndex((prevIndex) =>
              prevIndex - 1 < 0 ? groupedNews.length - 1 : prevIndex - 1
            )
          }
        />
      </Carousel>
    </aside>
  );
};

export default NewsInterface;
