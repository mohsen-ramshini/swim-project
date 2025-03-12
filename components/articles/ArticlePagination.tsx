"use client";
import React, { useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SingleArticleInterface from "./SingleArticleInterface";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useGetArticles } from "@/features/article/api/use-get-articles";
import { useGetArticlesByCategory } from "@/features/article/api/use-get-artilce-by-category";
import { useGetCategories } from "@/features/articleCategory/api/use-get-categories";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";

const ARTICLES_PER_PAGE = 4;

const ArticlePagination = () => {
  const { data: categories = [], isLoading: isCategoryLoading } =
    useGetCategories(); // دریافت دسته‌بندی‌ها

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  // دریافت همه مقالات برای رندر اولیه
  const { data: allArticles = [], isLoading: isAllLoading } = useGetArticles();

  // دریافت مقالات بر اساس دسته‌بندی انتخاب‌شده
  const normalizedCategoryId = selectedCategoryId ?? 0;

  const { data: categoryArticles = [], isLoading: isCategoryArticlesLoading } =
    useGetArticlesByCategory(normalizedCategoryId);

  // مشخص کردن مقالاتی که باید نمایش داده شوند
  const displayedArticles = useMemo(() => {
    return selectedCategoryId ? categoryArticles : allArticles;
  }, [selectedCategoryId, categoryArticles, allArticles]);

  const test = displayedArticles || [];
  const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(test?.data.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;

  const articlesArray = Array.isArray(displayedArticles)
    ? displayedArticles
    : displayedArticles?.data || [];

  const totalPages = Math.ceil(articlesArray.length / ARTICLES_PER_PAGE);

  const paginatedArticles = articlesArray.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  );

  // const paginatedArticles = test?.data.slice(
  //   startIndex,
  //   startIndex + ARTICLES_PER_PAGE
  // );
  const normalizedArticles = useMemo(() => {
    return (
      paginatedArticles?.map((article) => ({
        ...article,
        createdAt: new Date(article.createdAt),
        modifiedAt: article.modifiedAt
          ? new Date(article.modifiedAt)
          : undefined,
        publishTime: article.publishTime
          ? new Date(article.publishTime)
          : undefined,
      })) || []
    );
  }, [paginatedArticles]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId((prev) =>
      prev === parseInt(categoryId) ? null : parseInt(categoryId)
    );
    setCurrentPage(1); // بعد از تغییر دسته‌بندی، صفحه اول نمایش داده شود
  };

  if (isAllLoading || isCategoryArticlesLoading || isCategoryLoading) {
    return (
      <div className="max-w-screen-3xl mx-auto w-full pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col-reverse lg:flex-row-reverse">
        {/* لیست مقالات */}
        <div className="w-full lg:w-3/4 flex flex-col justify-center items-center">
          <div className="w-3/4">
            {normalizedArticles.map((article) => (
              <SingleArticleInterface key={article.id} data={article} />
            ))}
          </div>
        </div>

        {/* دسته‌بندی‌ها */}
        <div className="w-full lg:w-1/4 flex flex-col justify-start items-center lg:block">
          <aside className="w-full h-56 mr-10">
            <h3 className="hidden lg:block text-center font-semibold text-4xl">
              دسته بندی ها
            </h3>
            <div className="w-full p-10 text-right">
              <ul>
                {categories.map((category) => (
                  <li key={category.id}>
                    <label
                      htmlFor={String(category.id)}
                      className="mr-1 text-gray-500 text-xl cursor-pointer"
                    >
                      {category.title}
                    </label>
                    <Checkbox
                      id={String(category.id)}
                      checked={selectedCategoryId === category.id}
                      onCheckedChange={() =>
                        handleCategoryChange(String(category.id))
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* صفحه‌بندی */}
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

export default ArticlePagination;
