"use client";

import React, { useMemo, useState, useEffect } from "react";
import BookDetails from "./BookDetails";
import BookInterface from "./BookInterface";
import LoadingComponent from "../appLayout/LoadingComponent";
import BookComment from "./BookComment";
import { handlers } from "@/lib/mock";
import { z } from "zod";
import { insertBookSchema } from "@/db/schema";

interface Props {
  slug: string;
}

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

type BookType = z.infer<typeof insertBookSchema>;

const defaultBook: BookType = {
  slug: "",
  title: "در حال بارگذاری...",
  description: "",
  price: 0,
  ISBN: "",
  editionNo: 1,
  state: "",
  pageCount: 0,
  id: 0,
  thumbnail: null,
  createdAt: new Date(),
  modifiedAt: new Date(),
  isActive: true,
  categoryId: null,
  author: "",
};

const BookContent: React.FC<Props> = ({ slug }) => {
  const [book, setBook] = useState<BookType | null>(null);
  const [relatedBooks, setRelatedBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoryId, setCategoryId] = useState<number | null>(null);

  /* ----------------------- Normalizer ----------------------- */
  const normalizeSingle = (b: any): BookType => ({
    ...b,
    createdAt: new Date(b.createdAt),
    modifiedAt: b.modifiedAt ? new Date(b.modifiedAt) : undefined,
    publishTime: b.publishTime ? new Date(b.publishTime) : undefined,
  });

  const normalizeMany = (arr: any[]): BookType[] =>
    arr.map((b) => normalizeSingle(b));

  /* ---------------------- Fetch Book ------------------------ */
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);

      try {
        const res = USE_MOCK
          ? await handlers.books.getBookBySlug(slug)
          : await fetch(`/api/books/${slug}`).then((r) => r.json());

        const b = normalizeSingle(USE_MOCK ? res.data : res);

        setBook(b);
        setCategoryId(b.categoryId ?? null);
      } catch (err) {
        console.error("Book fetch error:", err);
        setBook(defaultBook);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [slug]);

  /* --------------- Fetch Related Books by Category ---------- */
  useEffect(() => {
    if (!categoryId) return;

    const fetchRelated = async () => {
      try {
        const res = USE_MOCK
          ? await handlers.books.getBooksByCategory(categoryId)
          : await fetch(`/api/books?category=${categoryId}`).then((r) =>
              r.json()
            );

        const arr = USE_MOCK ? res.data : res;

        setRelatedBooks(normalizeMany(arr));
      } catch (err) {
        console.error("Related books error:", err);
        setRelatedBooks([]);
      }
    };

    fetchRelated();
  }, [categoryId]);

  /* --------------------- Loading UI ------------------------ */
  if (loading || !book) {
    return <LoadingComponent />;
  }

  /* -------------------- Render UI -------------------------- */
  return (
    <aside className="w-full lg:h-full flex flex-col mt-10 justify-center items-center px-4">
      <h2 className="text-3xl lg:text-5xl font-extrabold my-10 text-center">
        مشخصات کتاب
      </h2>

      <div className="w-full lg:w-11/12 h-full">
        {/* Book Details */}
        <div className="h-auto lg:h-1/6 mb-20">
          <BookDetails data={book} />
        </div>

        {/* Description */}
        <h3 className="text-3xl lg:text-4xl font-semibold text-right my-10">
          توضیحات کتاب
        </h3>

        <div className="text-right lg:mr-36 h-auto min-h-96">
          {book.description}
        </div>

        {/* Related Books */}
        <div className="w-5/6 m-auto h-auto lg:h-1/6 my-10">
          <h5 className="text-3xl lg:text-4xl font-semibold text-right my-10">
            کتاب های دیگر انجمن علوم نوین شنا
          </h5>

          <BookInterface slider={true} data={relatedBooks} />
        </div>

        {/* Comments */}
        <div className="my-10">
          {book.id !== 0 && <BookComment bookId={book.id!} />}
        </div>
      </div>
    </aside>
  );
};

export default BookContent;
