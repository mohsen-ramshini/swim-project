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
import Content from "./Content";

type News = z.infer<typeof insertNewsSchema>;

interface Props {
  news: News[];
  slider: boolean;
  interval?: number;
  isLoading?: boolean; // prop جدید
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

const NewsInterface: React.FC<Props> = ({
  news,
  slider,
  interval = 3000,
  isLoading = false,
}) => {
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

  // ===== Skeleton برای حالت slider =====
  if (isLoading && slider) {
    const skeletonCount = itemsPerSlide * 2;
    return (
      <aside className="w-full h-auto flex flex-col items-end">
        <div className="flex justify-center items-center gap-4 w-full h-[550px]">
          {Array.from({ length: skeletonCount }).map((_, idx) => (
            <div key={idx} className="w-full max-w-3xl p-2">
              <CardContent className="flex flex-col items-end p-4">
                <div className="w-full h-48 md:h-64 lg:h-72 mb-4">
                  <Skeleton className="w-full h-full rounded-md" />
                </div>
                <Skeleton className="w-3/4 h-6 mb-2 rounded" />
                <Skeleton className="w-1/2 h-4 rounded" />
              </CardContent>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  // ===== Skeleton برای حالت slider=false (لیست عمودی) =====
  if (isLoading && !slider) {
    const skeletonCount = 1; // تعداد Skeleton ها
    return (
      <aside className="w-full flex flex-col items-center gap-6 my-10">
        {Array.from({ length: skeletonCount }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row-reverse w-full max-w-5xl h-64 md:h-64 lg:h-72 items-stretch gap-4 bg-gray-50 rounded-lg shadow-sm p-3"
          >
            {/* تصویر */}
            <div className="w-full md:w-1/3 h-full rounded-md overflow-hidden">
              <Skeleton className="w-full h-full rounded-md" />
            </div>

            {/* متن */}
            <div className="w-full md:w-2/3 flex flex-col justify-between items-end gap-3 px-4 py-2 h-full text-right">
              {/* عنوان */}
              <Skeleton className="w-3/4 h-6 md:h-7 rounded-md mt-1" />
              {/* خطوط توضیحات */}
              <div className="flex flex-col gap-2 w-full items-end text-right">
                <Skeleton className="w-full h-4 rounded-md" />
                <Skeleton className="w-5/6 h-4 rounded-md" />
                <Skeleton className="w-2/3 h-4 rounded-md" />
              </div>

              {/* خط پایین متن */}
              <Skeleton className="w-1/2 h-4 rounded-md mb-1" />
            </div>
          </div>
        ))}
      </aside>
    );
  }

  // ===== حالت واقعی slider =====
  if (slider) {
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
                      <CardContent className="flex flex-col items-end p-4">
                        <div className="w-full h-48 md:h-64 lg:h-72 mb-4">
                          <Skeleton className="w-full h-full rounded-md" />
                        </div>
                        <div className="w-full text-right mt-2 font-semibold text-lg md:text-xl">
                          {newsItem.title}
                        </div>
                        <div className="w-full text-right mt-2 font-normal text-sm md:text-base">
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
  }

  // ===== حالت واقعی slider=false =====
  return (
    <aside className="w-full h-auto flex flex-col items-end gap-6">
      {news.map((newsItem) => (
        <NewsContent key={newsItem.id} news={newsItem} />
      ))}
    </aside>
  );
};

export default NewsInterface;
