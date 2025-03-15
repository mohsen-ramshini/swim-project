"use client";
import React, { useMemo } from "react";
import BookDetails from "./BookDetails";
import { Button } from "../ui/button";
import { ArrowLeftCircle } from "lucide-react";
import Profile from "../articles/Profile";
import BookInterface from "./BookInterface";
import { useGetBookBySlug } from "@/features/book/api/use-get-book-by-slug";
import CommentForm from "@/components/comment/CommentForm";
import CommentSection from "../comment/CommentSection";
import Comment from "../comment/Comment";
import { useGetBooks } from "@/features/book/api/use-get-books";
import LoadingComponent from "../appLayout/LoadingComponent";

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
};

const BookContent: React.FC<Props> = ({ slug }) => {
  const {
    data: book = defaultBook,
    isLoading,
    isError,
  } = useGetBookBySlug(slug);
  const { data: relatedBooks } = useGetBooks();

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
      relatedBooks?.map((book) => ({
        ...book,
        createdAt: new Date(book.createdAt),
        modifiedAt: book.modifiedAt ? new Date(book.modifiedAt) : undefined,
        publishTime: book.publishTime ? new Date(book.publishTime) : undefined,
      })) || []
    );
  }, [relatedBooks]);

  if (isLoading) {
    <LoadingComponent />;
  }
  return (
    <aside className="w-full lg:h-full flex flex-col mt-10 justify-center items-center">
      <h2 className="text-5xl font-extrabold my-10">مشخصات کتاب</h2>
      <div className=" w-11/12 h-full">
        <div className="h-1/6 mb-20 ">
          <BookDetails data={normalizedBook} />
        </div>
        <h3 className="mr-36 text-4xl font-semibold text-right my-10">
          توضیحات کتاب
        </h3>
        <div className="mr-36 h-2/6 min-h-96 text-right">
          {book.description}
        </div>
        <div className=" h-1/6">
          <h5 className="text-4xl font-semibold text-right my-10">
            کتاب های دیگر انجمن علوم نوین شنا
          </h5>
          <BookInterface slider={true} data={normalizedBooks} />
        </div>
        <div className="my-10">
          <Comment />
        </div>
      </div>
    </aside>
  );
};

export default BookContent;
