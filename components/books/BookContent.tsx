"use client";
import React, { useMemo } from "react";
import BookDetails from "./BookDetails";
import { Button } from "../ui/button";
import { ArrowLeftCircle } from "lucide-react";
import Profile from "../articles/Profile";
import BookInterface from "./BookInterface";
import { useGetBookBySlug } from "@/features/book/api/use-get-book-by-slug";

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

  const normalizedBook = useMemo(() => {
    if (!book) return null; // جلوگیری از ارور undefined

    // اگر book یک آرایه باشد، اولین مقدارش را بگیر
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

  return (
    <aside className="w-full lg:h-[1750px] flex flex-col mt-10 justify-center items-center">
      <h2 className="text-5xl font-extrabold my-10">مشخصات کتاب</h2>
      <div className=" w-11/12 h-full">
        <div className="h-1/6 mb-20">
          <BookDetails data={normalizedBook} />
        </div>
        <div className=" h-2/6 text-right">{book.description}</div>
        <div className=" h-1/6 flex flex-col justify-start items-end">
          <div className="flex flex-row justify-between items-baseline  w-full">
            <Button variant={"ghost"}>
              مشاهده همه <ArrowLeftCircle />
            </Button>
            <h6>نظرات کاربران</h6>
          </div>
          <div className="w-full h-full flex flex-row-reverse justify-start items-center gap-2">
            <div className="h-full h max-w-60 ">
              <div>
                <Profile fullName="محسن رامشینی" size="lg" />
              </div>
              <div className="text-xs text-right">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                ullam expedita laborum ad fuga nulla error unde? Molestiae
                quibusdam enim ipsa saepe quidem ratione, fugit harum rerum
                totam vel a!
              </div>
            </div>
            <div className="h-full h max-w-60">
              <div>
                <Profile fullName="محسن رامشینی" size="lg" />
              </div>
              <div className="text-xs text-right">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                ullam expedita laborum ad fuga nulla error unde? Molestiae
                quibusdam enim ipsa saepe quidem ratione, fugit harum rerum
                totam vel a!
              </div>
            </div>
            <div className="h-full h max-w-60">
              <div>
                <Profile fullName="محسن رامشینی" size="lg" />
              </div>
              <div className="text-xs text-right">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                ullam expedita laborum ad fuga nulla error unde? Molestiae
                quibusdam enim ipsa saepe quidem ratione, fugit harum rerum
                totam vel a!
              </div>
            </div>
          </div>
        </div>
        <div className=" h-2/6">
          <h6>{/* <BookInterface data={books} slider={true} /> */}</h6>
        </div>
      </div>
    </aside>
  );
};

export default BookContent;
