"use client";
import React, { useMemo } from "react";
import BookInterface from "@/components/books/BookInterface";
import HeroSection from "@/components/hero/HeroSection";
import { useGetBooks } from "@/features/book/api/use-get-books";
import LoadingComponent from "@/components/appLayout/LoadingComponent";

const Books = () => {
  const { data: books = [], isLoading, isError } = useGetBooks();

  const normalizedBooks = useMemo(() => {
    return (
      books?.map((book) => ({
        ...book,
        createdAt: new Date(book.createdAt),
        modifiedAt: book.modifiedAt ? new Date(book.modifiedAt) : undefined,
        publishTime: book.publishTime ? new Date(book.publishTime) : undefined,
      })) || []
    );
  }, [books]);

  return (
    <section className="h-full w-full flex flex-col justify-center items-center">
      <HeroSection
        imageSourse={"banner-two.jpg"}
        width={2048}
        height={500}
        dialog={"سلام"}
      />
      <h2 className="text-5xl font-extrabold my-20">همه کتاب ها</h2>
      <div className="">
        {isLoading ? (
          <LoadingComponent />
        ) : (
          <BookInterface data={normalizedBooks} slider={false} />
        )}
      </div>
    </section>
  );
};

export default Books;
