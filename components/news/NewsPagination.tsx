"use client";
import React, { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import NewsInterface from "./NewsInterface";
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
import NewsSingleInterface from "./NewsSingleInterface";
import { useGetNews } from "@/features/news/api/use-get-news";

const ARTICLES_PER_PAGE = 4;

const NewsPagination = () => {
  const { data: News = [], isLoading, isError } = useGetNews();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(News.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;

  const normalizedArticles = useMemo(() => {
    return (
      News?.map((article) => ({
        ...article,
        createdAt: new Date(article.createdAt),
        modifiedAt: article.modifiedAt
          ? new Date(article.modifiedAt)
          : undefined,
        publishTime: article.publishDate
          ? new Date(article.publishDate)
          : undefined,
      })) || []
    );
  }, [News]);

  const paginatedArticles = normalizedArticles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  );
  return (
    <section className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-row-reverse">
        <div className="w-full lg:w-3/4 flex flex-col justify-center items-center">
          <div className="w-3/4">
            {paginatedArticles.map((article) => (
              <NewsSingleInterface key={article.id} data={article} />
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

export default NewsPagination;
