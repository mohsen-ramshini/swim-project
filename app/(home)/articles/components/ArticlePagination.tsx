"use client";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SingleArticleInterface from "./SingleArticleInterface";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ARTICLES_PER_PAGE = 4;

const Artciles = [
  {
    id: 1,
    articleType: 1,
    title: "مزیای شنا برای سلامتی",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا یک ورزش کم‌فشار است که تأثیر زیادی بر سلامت قلب و عروق، افزایش ظرفیت تنفسی و تقویت عضلات دارد. این ورزش به کاهش استرس، بهبود انعطاف‌پذیری و افزایش استقامت بدنی کمک می‌کند. همچنین برای افراد مبتلا به مشکلات مفصلی یا کمردرد، گزینه‌ای ایده‌آل است",
    categoryId: 1,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 2,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 3,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 4,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 5,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 6,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
];

const ArticlesList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Artciles.length / ARTICLES_PER_PAGE);

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const paginatedArticles = Artciles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  );

  return (
    <section className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-row-reverse">
        <div className="w-full lg:w-3/4 flex flex-col justify-center items-center">
          <div className="w-3/4">
            {paginatedArticles.map((article) => (
              <SingleArticleInterface key={article.id} data={article} />
            ))}
          </div>
        </div>
        <div className="w-1/4 flex flex-col justify-start items-center hidden lg:block">
          <aside className="w-full h-56 mt-20">
            <h3 className="text-center font-semibold text-4xl">دسته بندی ها</h3>
            <div className="w-full p-10 text-right">
              <ul>
                <li>
                  <label htmlFor="news" className="mr-1 text-gray-500 text-xl">
                    اخبار
                  </label>
                  <Checkbox id="news" />
                </li>
                <li>
                  <label
                    htmlFor="anatomy"
                    className="mr-1 text-gray-500 text-xl"
                  >
                    آناتومی شنا
                  </label>
                  <Checkbox id="anatomy" />
                </li>
                <li>
                  <label
                    htmlFor="fitness"
                    className="mr-1 text-gray-500 text-xl"
                  >
                    بدنسازی شنا
                  </label>
                  <Checkbox id="fitness" />
                </li>
              </ul>
            </div>
            <div className="w-full h-full rounded-sm bg-blue-400 text-center text-3xl font-bold">
              <div className="pt-5 text-white">با ما تماس بگیرید</div>
            </div>
          </aside>
        </div>
      </div>
      <div className="bg-white flex justify-center mt-4">
        <Pagination>
          <PaginationContent className="flex flex-row-reverse">
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
};

export default ArticlesList;
