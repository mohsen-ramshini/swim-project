"use client";
import React, { useEffect, useMemo, useState } from "react";
import BookInterface from "@/components/books/BookInterface";
import HeroSection from "@/components/hero/HeroSection";
import LoadingComponent from "@/components/appLayout/LoadingComponent";
import { handlers } from "@/lib/mock";
import { insertBookSchema } from "@/db/schema";
import { z } from "zod";

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

type BookType = z.infer<typeof insertBookSchema>;

const Books = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);

  /* ----------------------- Normalizer ----------------------- */
  const normalize = (res: any, isMock: boolean): BookType[] => {
    const arr = isMock ? res.data ?? [] : res;

    return arr.map((book: any) => ({
      ...book,
      createdAt: new Date(book.createdAt),
      modifiedAt: book.modifiedAt ? new Date(book.modifiedAt) : undefined,
      publishTime: book.publishTime ? new Date(book.publishTime) : undefined,
    }));
  };

  /* -------------------- Fetch Books -------------------- */
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const res = USE_MOCK
          ? await handlers.books.getBooks()
          : await fetch("/api/books").then((r) => r.json());

        const normalized = normalize(res, USE_MOCK);
        setBooks(normalized);
      } catch (err) {
        console.error("Books Fetch Error:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* ----------------------- Render ----------------------- */
  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <HeroSection
        imageSourse={"banner-two.jpg"}
        width={1920}
        height={680}
        title="لیست کتاب ها"
        subtitle="صفحه اصلی | لیست همه کتاب ها"
      />

      <h2 className="text-5xl font-extrabold my-20">همه کتاب ها</h2>

      <div className="">
        {loading ? (
          <LoadingComponent />
        ) : (
          <BookInterface data={books} slider={false} />
        )}
      </div>
    </section>
  );
};

export default Books;
