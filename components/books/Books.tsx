"use client";
import React, { useMemo } from "react";
import BookInterface from "./BookInterface";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetBooks } from "@/features/book/api/use-get-books";

const Books = () => {
  const router = useRouter();
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
    <section className="h-[620px] lg:h-[750px] flex flex-col justify-start items-center my-20 ">
      <h2 className="text-5xl font-extrabold text-right mb-5">کتاب ها</h2>
      <Button variant={"ghost"} onClick={() => router.push("/books")}>
        <ArrowLeftCircle />
        <p>دیدن همه</p>
      </Button>
      <div className="w-3/4 lg:w-5/6 h-full flex flex-row justify-center items-center mt-10">
        <BookInterface data={normalizedBooks} slider={true} />
      </div>
    </section>
  );
};

export default Books;
