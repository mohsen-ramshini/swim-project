"use client";
import React, { useEffect, useMemo, useState } from "react";
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

import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";
import { handlers } from "@/lib/mock";
import { z } from "zod";
import { insertArticleSchema } from "@/db/schema";

const ARTICLES_PER_PAGE = 4;
const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

type ArticleType = z.infer<typeof insertArticleSchema>;

const ArticlePagination = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [allArticles, setAllArticles] = useState<ArticleType[]>([]);
  const [categoryArticles, setCategoryArticles] = useState<ArticleType[]>([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [loadingCategoryArticles, setLoadingCategoryArticles] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  /* -----------------------------------------------------
     Helper: Normalize mock/real API response into array
  ----------------------------------------------------- */
  const normalize = (res: any, isMock: boolean) => {
    const arr = isMock ? res.data ?? [] : res;

    return arr.map((article: any) => ({
      ...article,
      createdAt: new Date(article.createdAt),
      modifiedAt: article.modifiedAt ? new Date(article.modifiedAt) : undefined,
      publishTime: article.publishTime
        ? new Date(article.publishTime)
        : undefined,
    }));
  };

  /* ------------------ Fetch categories ------------------ */
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const res = USE_MOCK
          ? await handlers.articles.getArticleCategories()
          : await fetch("/api/article-categories").then((r) => r.json());

        const data = USE_MOCK ? res.data : res;

        setCategories(data);
      } catch (err) {
        console.error(err);
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  /* ------------------ Fetch all articles ------------------ */
  useEffect(() => {
    const fetchArticles = async () => {
      setLoadingArticles(true);
      try {
        const res = USE_MOCK
          ? await handlers.articles.getArticles()
          : await fetch("/api/articles").then((r) => r.json());

        setAllArticles(normalize(res, USE_MOCK));
      } catch (err) {
        console.error(err);
        setAllArticles([]);
      } finally {
        setLoadingArticles(false);
      }
    };

    fetchArticles();
  }, []);

  /* ---------------- Fetch category articles ---------------- */
  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchCategoryArticles = async () => {
      setLoadingCategoryArticles(true);

      try {
        const res = USE_MOCK
          ? await handlers.articles.getArticlesByCategory(selectedCategoryId)
          : await fetch(`/api/articles?category=${selectedCategoryId}`).then(
              (r) => r.json()
            );

        setCategoryArticles(normalize(res, USE_MOCK));
      } catch (err) {
        console.error(err);
        setCategoryArticles([]);
      } finally {
        setLoadingCategoryArticles(false);
      }
    };

    fetchCategoryArticles();
  }, [selectedCategoryId]);

  /* ---------------- Displayed articles ---------------- */
  const displayedArticles = selectedCategoryId ? categoryArticles : allArticles;

  /* ---------------- Pagination ---------------- */
  const totalPages = Math.ceil(displayedArticles.length / ARTICLES_PER_PAGE);
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;

  const paginatedArticles = displayedArticles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  );

  /* ---------------- Loading state ---------------- */
  if (loadingArticles || loadingCategories || loadingCategoryArticles) {
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

  /* ---------------- Render ---------------- */
  return (
    <section className="w-full h-full flex flex-col">
      <div className="w-full h-full flex flex-col-reverse lg:flex-row-reverse">
        {/* Articles */}
        <div className="w-full lg:w-3/4 flex flex-col justify-center items-center">
          <div className="w-3/4">
            {paginatedArticles.map((article) => (
              <SingleArticleInterface key={article.id} data={article} />
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="w-full lg:w-1/4 flex flex-col justify-start items-center lg:block">
          <aside className="w-full h-56 mr-10">
            <h3 className="hidden lg:block text-center font-semibold text-4xl">
              دسته بندی ها
            </h3>
            <div className="w-full p-10 text-right">
              <ul>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <label
                      htmlFor={String(cat.id)}
                      className="mr-1 text-gray-500 text-xl cursor-pointer"
                    >
                      {cat.title}
                    </label>
                    <Checkbox
                      id={String(cat.id)}
                      checked={selectedCategoryId === cat.id}
                      onCheckedChange={() =>
                        setSelectedCategoryId(
                          selectedCategoryId === cat.id ? null : cat.id
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      {/* Pagination */}
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
