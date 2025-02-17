"use client";
import React, { useState } from "react";
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
import { insertArticleSchema } from "@/db/schema/article";
import News from "./News";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type News = z.infer<typeof insertArticleSchema>;

interface Props {
  news: News[];
  slider: boolean;
}

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  React.useEffect(() => {
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

const NewsInterface: React.FC<Props> = ({ news, slider }) => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const itemsPerSlide = isMobile ? 1 : 2;
  const groupedNews = chunkArray(news, itemsPerSlide);

  if (!slider) {
    return (
      <aside className="w-full h-full flex flex-col justify-center items-center">
        <div className="w-4/5 h-full  ">
          {news.map((news) => (
            <div
              key={news.id}
              className="flex flex-row-reverse border-b-2 min-h-44 my-5"
            >
              <div className="w-1/5 mb-2">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="w-4/5 h-[176px] flex flex-col mr-5">
                <div className="w-full h-1/3 text-right font-semibold text-2xl">
                  {news.title}
                </div>
                <div className="w-full h-1/3 text-right ">{news.excerpt}</div>
                <div className="flex items-start w-full h-1/3 ">
                  <Button
                    variant={"ghost"}
                    onClick={() => router.push(`/news/${news.slug}`)}
                  >
                    مشاهده
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full h-full flex flex-col ">
      <Carousel className="w-full h-full">
        <CarouselContent className="w-full h-full lg:h-[550px]">
          {groupedNews.map((newsGroup, index) => (
            <CarouselItem
              key={newsGroup.length > 0 ? newsGroup[0].id : `group-${index}`}
              className={cn(
                "flex justify-center items-center h-full gap-2",
                isMobile ? "w-full" : "w-1/3"
              )}
            >
              {newsGroup.map((news) => (
                <Link
                  href={`/news/${news.slug}`}
                  className="w-full md:w-1/3 h-full p-2"
                >
                  <Card key={news.id} className="w-full h-full ">
                    <CardContent className="flex flex-col items-center p-4 h-full">
                      <div className="h-5/6 w-full ">
                        <Skeleton className="w-full h-full" />
                      </div>
                      <div className="h-1/6 w-full text-right mt-5 font-semibold text-2xl">
                        {news.title}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </aside>
  );
};

export default NewsInterface;
