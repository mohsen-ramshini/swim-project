"use client";
import React, { useEffect, useMemo, useState } from "react";
import BookInterface from "./BookInterface";
import { ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetBooks as useGetBooksAPI } from "@/features/book/api/use-get-books";
import { handlers } from "@/lib/mock";
import type { BookType } from "@/db/schema/book/book";

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

const Books = () => {
  const router = useRouter();
  const [books, setBooks] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);

      try {
        let fetchedBooks: BookType[] = [];

        if (USE_MOCK) {
          const res = await handlers.books.getBooks();
          fetchedBooks = (res.data as BookType[]) ?? [];
        } else {
          const res = await useGetBooksAPI();
          // fetchedBooks = (res.data as BookType[]) ?? [];
        }

        setBooks(fetchedBooks);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const normalizedBooks = useMemo(() => {
    return books.map((book) => ({
      ...book,
      createdAt: new Date(book.createdAt),
      modifiedAt: book.modifiedAt ? new Date(book.modifiedAt) : undefined,
      publishTime: book.publishTime ? new Date(book.publishTime) : undefined,
    }));
  }, [books]);

  if (error)
    return (
      <div className="text-red-500">خطا در دریافت کتاب‌ها: {error.message}</div>
    );

  return (
    <section className="h-[620px] lg:h-[750px] flex flex-col justify-start items-center my-20 ">
      <h2 className="text-5xl font-extrabold text-right mb-5">کتاب ها</h2>

      <Button variant={"ghost"} onClick={() => router.push("/books")}>
        <ArrowLeftCircle />
        <p>دیدن همه</p>
      </Button>

      <div className="w-3/4 lg:w-5/6 h-full flex flex-row justify-center items-center mt-10">
        <BookInterface data={normalizedBooks} slider={true} isLoading={true} />
      </div>
    </section>
  );
};

export default Books;
