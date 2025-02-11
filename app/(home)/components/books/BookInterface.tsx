"use client";
import { insertBookSchema } from "@/db/schema/book";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// هوک برای تشخیص سایز صفحه
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

type Book = z.infer<typeof insertBookSchema>;

interface Props {
  data: Book[];
  slider: boolean;
}

// تابع تقسیم آرایه بر اساس تعداد آیتم‌ها در هر صفحه
const chunkArray = (arr: Book[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const BookInterface: React.FC<Props> = ({ data, slider }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const itemsPerSlide = isMobile ? 1 : 3;
  const groupedBooks = chunkArray(data, itemsPerSlide);

  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);
  if (!slider) {
    // نمایش همه کتاب‌ها بدون اسلایدر
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((book) => (
          <div key={book.id} className="w-full h-full p-2">
            <div className="flex flex-col items-center p-4 h-full">
              <div className="h-[250px] lg:h-4/5 w-full">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="w-full h-1/5 text-center">
                <h3 className="w-full text-xl h-1/4 font-semibold my-2">
                  {book.title}
                </h3>
                <p className="hidden lg:block text-sm h-1/4 text-gray-600">
                  {book.description?.substring(0, 50) ?? "توضیحات موجود نیست"}
                  ...
                </p>
                <div className="flex flex-col border-t-2">
                  <div className="flex flex-row items-center justify-around opacity-90 text-gray-500">
                    <p>تعداد صفحات</p>
                    <p>قیمت</p>
                  </div>
                  <div className="flex flex-row items-center justify-around relative left-5">
                    <p>{book.pageCount ?? "نامشخص"}</p>
                    <p className="flex flex-row gap-2 items-baseline text-md h-1/4 font-bold mt-2">
                      <span>تومان</span>
                      {book.price ?? "نامشخص"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }
  return (
    <aside className="w-full h-ful">
      <Carousel className="w-full h-full">
        <CarouselContent className="w-full h-full lg:h-[550px]">
          {groupedBooks.map((bookGroup, index) => (
            <CarouselItem
              key={index}
              className={cn(
                "flex justify-center items-center h-full gap-2",
                isMobile ? "w-full" : "w-1/3"
              )}
            >
              {bookGroup.map((book) => (
                <Card key={book.id} className="w-full md:w-1/3 h-full p-2">
                  <CardContent className="flex flex-col items-center p-4 h-full">
                    <div className="h-[250px] lg:h-4/5 w-full">
                      <Skeleton className="w-full h-full" />
                    </div>
                    <div className="w-full h-1/5 text-center">
                      <h3 className="w-full text-xl h-1/4 font-semibold my-2">
                        {book.title}
                      </h3>
                      <p className="hidden lg:block text-sm h-1/4 text-gray-600">
                        ...{book.description.substring(0, 50)}
                      </p>
                      <div className="flex flex-col border-t-2">
                        <div className="flex flex-row items-center justify-around opacity-90 text-gray-500">
                          <p>تعداد صفحات</p>
                          <p>قیمت</p>
                        </div>
                        <div className="flex flex-row items-center justify-around relative left-5">
                          <p>{book.pageCount}</p>
                          <p className="flex flex-row gap-2 items-baseline text-md h-1/4 font-bold mt-2">
                            <span>تومان</span>
                            {book.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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

export default BookInterface;
