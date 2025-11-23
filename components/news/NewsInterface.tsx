"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import { insertNewsSchema } from "@/db/schema/news/news";
import Link from "next/link";
import Content from "./Content";

type News = z.infer<typeof insertNewsSchema>;

interface Props {
  news: News[];
  slider: boolean;
  interval?: number;
  isLoading?: boolean;
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

const chunkArray = (arr: News[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );

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
      setActiveIndex((prev) => (prev + 1 >= groupedNews.length ? 0 : prev + 1));
    }, interval);
    return () => clearInterval(timer);
  }, [groupedNews.length, slider, interval]);

  // =================== SKELETONS ===================
  if (isLoading && slider) {
    return (
      <aside className="w-full flex justify-center my-6">
        <div className="w-full max-w-6xl">
          <div className="relative w-full h-[420px] md:h-[520px] rounded-xl overflow-hidden shadow-md bg-white">
            <Skeleton className="absolute inset-0 w-full h-full" />
            <div className="absolute bottom-0 right-0 w-full p-6 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-end">
              <Skeleton className="w-2/3 h-7 rounded-md mb-3" />
              <Skeleton className="w-1/2 h-6 rounded-md mb-2" />
              <Skeleton className="w-1/3 h-5 rounded-md" />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4 opacity-60">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-10 h-10 rounded-full" />
          </div>
        </div>
      </aside>
    );
  }

  if (isLoading && !slider) {
    return (
      <aside className="w-full flex flex-col items-center gap-8 my-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-full max-w-5xl bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col md:flex-row-reverse gap-4 p-4"
          >
            <div className="w-full md:w-1/3 h-48 md:h-56 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="w-full md:w-2/3 flex flex-col items-end gap-4 text-right">
              <Skeleton className="w-3/4 h-6 rounded-md" />
              <div className="flex flex-col gap-3 w-full">
                <Skeleton className="w-full h-4 rounded-md" />
                <Skeleton className="w-5/6 h-4 rounded-md" />
                <Skeleton className="w-4/6 h-4 rounded-md" />
              </div>
              <Skeleton className="w-1/4 h-4 rounded-md" />
            </div>
          </div>
        ))}
      </aside>
    );
  }

  // =================== REAL SLIDER ===================
  if (slider) {
    return (
      <aside className="w-full flex justify-center my-6">
        <Carousel className="w-full max-w-6xl">
          <CarouselContent
            className="transition-transform"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
              transition: "transform 0.6s ease-in-out",
            }}
          >
            {groupedNews.map((group, idx) => (
              <CarouselItem key={idx} className="w-full">
                {group.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="block"
                  >
                    <div className="relative w-full h-[420px] md:h-[520px] rounded-xl overflow-hidden shadow-md">
                      <Image
                        src={item.banner || "/placeholder.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 right-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white flex flex-col items-end">
                        <h2 className="text-2xl font-bold mb-3">
                          {item.title}
                        </h2>
                        <div className="text-sm md:text-base leading-6 max-w-xl">
                          <Content data={item.content?.slice(0, 150) || ""} />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            onClick={() =>
              setActiveIndex((prev) =>
                prev - 1 < 0 ? groupedNews.length - 1 : prev - 1
              )
            }
          />
          <CarouselNext
            onClick={() =>
              setActiveIndex((prev) =>
                prev + 1 >= groupedNews.length ? 0 : prev + 1
              )
            }
          />
        </Carousel>
      </aside>
    );
  }

  // =================== REAL LIST VIEW ===================
  return (
    <aside className="w-full flex flex-col items-end gap-8 my-8">
      {news.map((item) => (
        <Link
          key={item.id}
          href={`/news/${item.slug}`}
          className="w-full max-w-5xl bg-white border rounded-xl shadow-md flex flex-col md:flex-row-reverse gap-4 overflow-hidden p-4"
        >
          <div className="w-full md:w-1/3 h-48 md:h-56 rounded-lg overflow-hidden relative">
            {/* <Image
              src={item.banner || "/placeholder.jpg"}
              alt={item.title}
              fill
              className="object-cover"
            /> */}
            <Skeleton className="w-full h-full" />
          </div>
          <div className="w-full md:w-2/3 flex flex-col items-end gap-4 text-right">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <div className="text-gray-700 text-sm md:text-base leading-7">
              <Content data={item.content?.slice(0, 180) || ""} />
            </div>
          </div>
        </Link>
      ))}
    </aside>
  );
};

export default NewsInterface;
