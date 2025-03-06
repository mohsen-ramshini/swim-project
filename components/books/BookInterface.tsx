// "use client";
// import { insertBookSchema } from "@/db/schema/book/book";
// import React, { useEffect, useState } from "react";
// import { z } from "zod";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { Skeleton } from "@/components/ui/skeleton";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";

// // هوک برای تشخیص سایز صفحه
// const useMediaQuery = (query: string) => {
//   const [matches, setMatches] = useState(false);

//   React.useEffect(() => {
//     const media = window.matchMedia(query);
//     setMatches(media.matches);
//     const listener = () => setMatches(media.matches);
//     media.addEventListener("change", listener);
//     return () => media.removeEventListener("change", listener);
//   }, [query]);

//   return matches;
// };

// type Book = z.infer<typeof insertBookSchema>;

// interface Props {
//   data: Book[];
//   slider: boolean;
// }

// const chunkArray = (arr: Book[], size: number) => {
//   return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
//     arr.slice(i * size, i * size + size)
//   );
// };

// const BookInterface: React.FC<Props> = ({ data, slider }) => {
//   const [visibleCount, setVisibleCount] = useState(6);
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const itemsPerSlide = isMobile ? 1 : 3;
//   const groupedBooks = chunkArray(data, itemsPerSlide);

//   const showMoreBooks = () => {
//     setVisibleCount((prev) => prev + 6);
//   };
//   const showLessBooks = () => {
//     setVisibleCount((prev) => (prev = 6));
//   };

//   if (!slider) {
//     return (
//       <section className="flex flex-col justify-center items-center w-full h-full">
//         <div className="grid grid-cols-1 w-[350px] h-full md:w-[800px] md:grid-cols-2 lg:w-full lg:grid-cols-3 lg:h-full gap-4 mb-10">
//           {data.slice(0, visibleCount).map((book) => (
//             <Link href={`/books/${book.slug}`}>
//               <div key={book.id} className="w-full h-full p-2 lg:min-h-96 ">
//                 <div className="flex flex-col items-center p-4 h-full mb-5">
//                   <div className="h-[250px] lg:h-4/5 w-full ">
//                     <Skeleton className="w-full h-full" />
//                   </div>
//                   <div className="w-full h-1/5 text-center">
//                     <h3 className="w-full text-xl h-1/4 font-semibold my-4">
//                       {book.title}
//                     </h3>
//                     <p className="hidden lg:block text-sm h-1/4 text-gray-600 mb-2">
//                       {book.description?.substring(0, 50) ??
//                         "توضیحات موجود نیست"}
//                       ...
//                     </p>
//                     <div className="flex flex-col border-t-2">
//                       <div className="flex flex-row items-center justify-around opacity-90 text-gray-500">
//                         <p>تعداد صفحات</p>
//                         <p>قیمت</p>
//                       </div>
//                       <div className="flex flex-row items-center justify-around relative left-5">
//                         <p>{book.pageCount ?? "نامشخص"}</p>
//                         <p className="flex flex-row gap-2 items-baseline text-md h-1/4 font-bold mt-2">
//                           <span>تومان</span>
//                           {book.price ?? "نامشخص"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//         <div className="w-1/5 text-center mb-5">
//           {visibleCount < data.length ? (
//             <Button
//               onClick={showMoreBooks}
//               variant={"ghost"}
//               className="w-full px-12"
//             >
//               مشاهده بیشتر
//             </Button>
//           ) : (
//             <Button
//               onClick={showLessBooks}
//               variant={"ghost"}
//               className="w-full px-12"
//             >
//               مشاهده کمتر
//             </Button>
//           )}
//         </div>
//       </section>
//     );
//   }
//   return (
//     <aside className="w-full h-ful">
//       <Carousel className="w-full h-full">
//         <CarouselContent className="w-full h-full lg:h-[550px]">
//           {groupedBooks.map((bookGroup, index) => (
//             <CarouselItem
//               key={bookGroup.length > 0 ? bookGroup[0].id : `group-${index}`}
//               className={cn(
//                 "flex justify-center items-center h-full gap-2",
//                 isMobile ? "w-full" : "w-1/3"
//               )}
//             >
//               {bookGroup.map((book) => (
//                 <Link
//                   href={`/books/${book.slug}`}
//                   className="w-full md:w-1/3 h-full p-2 "
//                 >
//                   <Card key={book.id} className="w-full h-full">
//                     <CardContent className="flex flex-col items-center p-4 h-full  pb-10">
//                       <div className="h-[250px] lg:h-4/5 w-full">
//                         <Skeleton className="w-full h-full" />
//                       </div>
//                       <div className="w-full h-1/5 text-center">
//                         <h3 className="w-full text-xl h-1/4 font-semibold my-2">
//                           {book.title}
//                         </h3>
//                         <p className="hidden lg:block text-sm h-1/4 text-gray-600">
//                           ...{book.description.substring(0, 50)}
//                         </p>
//                         <div className="flex flex-col border-t-2">
//                           <div className="flex flex-row items-center justify-around opacity-90 text-gray-500">
//                             <p>تعداد صفحات</p>
//                             <p>قیمت</p>
//                           </div>
//                           <div className="flex flex-row items-center justify-around relative left-5">
//                             <p>{book.pageCount}</p>
//                             <p className="flex flex-row gap-2 items-baseline text-md h-1/4 font-bold mt-2">
//                               <span>تومان</span>
//                               {book.price}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               ))}
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious />
//         <CarouselNext />
//       </Carousel>
//     </aside>
//   );
// };

// export default BookInterface;

"use client";
import { insertBookSchema } from "@/db/schema/book/book";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const chunkArray = (arr: Book[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const BookInterface: React.FC<Props> = ({ data, slider }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const itemsPerSlide = isMobile ? 1 : 3;
  const groupedBooks = chunkArray(data, itemsPerSlide);

  const showMoreBooks = () => {
    setVisibleCount((prev) => prev + 6);
  };
  const showLessBooks = () => {
    setVisibleCount(6);
  };

  if (!slider) {
    return (
      <section className="flex flex-col justify-center items-center w-full h-full">
        <div className="grid grid-cols-1 w-[350px] h-full md:w-[800px] md:grid-cols-2 lg:w-full lg:grid-cols-3 lg:h-full gap-4 mb-10">
          {data.slice(0, visibleCount).map((book) => (
            <Link key={book.id} href={`/books/${book.slug}`}>
              <div className="w-full h-full p-2 lg:min-h-96">
                <div className="flex flex-col items-center p-4 h-full mb-5">
                  <div className="h-[250px] lg:h-4/5 w-full">
                    <Skeleton className="w-full h-full" />
                  </div>
                  <div className="w-full h-1/5 text-center">
                    <h3 className="w-full text-xl h-1/4 font-semibold my-4">
                      {book.title}
                    </h3>
                    <p className="hidden lg:block text-sm h-1/4 text-gray-600 mb-2">
                      {book.description?.substring(0, 50) ??
                        "توضیحات موجود نیست"}
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
            </Link>
          ))}
        </div>
        <div className="w-1/5 text-center mb-5">
          {visibleCount < data.length ? (
            <Button
              onClick={showMoreBooks}
              variant={"ghost"}
              className="w-full px-12"
            >
              مشاهده بیشتر
            </Button>
          ) : (
            <Button
              onClick={showLessBooks}
              variant={"ghost"}
              className="w-full px-12"
            >
              مشاهده کمتر
            </Button>
          )}
        </div>
      </section>
    );
  }

  return (
    <aside className="w-full h-full">
      <Carousel className="w-full h-full">
        <CarouselContent className="w-full h-full lg:h-[550px]">
          {groupedBooks.map((bookGroup, index) => (
            <CarouselItem
              key={bookGroup.length > 0 ? bookGroup[0].id : `group-${index}`}
              className={cn(
                "flex justify-center items-center h-full gap-2",
                isMobile ? "w-full" : "w-1/3"
              )}
            >
              {bookGroup.map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.slug}`}
                  className="w-full md:w-1/3 h-full p-2"
                >
                  <Card className="w-full h-full">
                    <CardContent className="flex flex-col items-center p-4 h-full pb-10">
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

export default BookInterface;
