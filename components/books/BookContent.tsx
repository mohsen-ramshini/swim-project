"use client";
import React, { useMemo, useState, useEffect } from "react";
import BookDetails from "./BookDetails";
import BookInterface from "./BookInterface";
import { useGetBookBySlug } from "@/features/book/api/use-get-book-by-slug";
import { useGetBooks } from "@/features/book/api/use-get-books";
import LoadingComponent from "../appLayout/LoadingComponent";
import { useGetBookByCategory } from "@/features/book/api/use-get-book-by-category";
import BookComment from "./BookComment";

interface Props {
  slug: string;
}

const defaultBook = {
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
};

const BookContent: React.FC<Props> = ({ slug }) => {
  const [bookId, setBookId] = useState(0);
  const {
    data: book = defaultBook,
    isLoading,
    isError,
  } = useGetBookBySlug(slug);

  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    if ("categoryId" in book && book.categoryId !== undefined) {
      setCategoryId(book.categoryId ?? null);
    }
  }, [book]);

  const { data: relatedBooks } = useGetBookByCategory(categoryId ?? 0);

  useEffect(() => {
    if (book.id !== 0) {
      setBookId(book.id);
    }
  }, [book]);

  const normalizedBook = useMemo(() => {
    if (!book) return null;
    const singleBook = Array.isArray(book) ? book[0] : book;
    return {
      ...singleBook,
      createdAt: new Date(singleBook.createdAt),
      modifiedAt: singleBook.modifiedAt
        ? new Date(singleBook.modifiedAt)
        : undefined,
      publishTime: singleBook.publishTime
        ? new Date(singleBook.publishTime)
        : undefined,
    };
  }, [book]);

  const normalizedBooks = useMemo(() => {
    return (
      relatedBooks?.data?.map((book) => ({
        ...book,
        createdAt: new Date(book.createdAt),
        modifiedAt: book.modifiedAt ? new Date(book.modifiedAt) : undefined,
        publishTime: book.publishTime ? new Date(book.publishTime) : undefined,
      })) || []
    );
  }, [relatedBooks]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <aside className="w-full lg:h-full flex flex-col mt-10 justify-center items-center px-4">
      <h2 className="text-3xl lg:text-5xl font-extrabold my-10 text-center">
        مشخصات کتاب
      </h2>
      <div className="w-full lg:w-11/12 h-full">
        <div className="h-auto lg:h-1/6 mb-20">
          <BookDetails data={normalizedBook} />
        </div>
        <h3 className="text-3xl lg:text-4xl font-semibold text-right my-10">
          توضیحات کتاب
        </h3>
        <div className="text-right lg:mr-36 h-auto min-h-96">
          {book.description}
        </div>
        <div className="w-5/6 m-auto h-auto lg:h-1/6 my-10">
          <h5 className="text-3xl lg:text-4xl font-semibold text-right my-10">
            کتاب های دیگر انجمن علوم نوین شنا
          </h5>
          <BookInterface slider={true} data={normalizedBooks} />
        </div>
        <div className="my-10">
          {bookId !== 0 && <BookComment bookId={bookId} />}
        </div>
      </div>
    </aside>
  );
};

export default BookContent;
