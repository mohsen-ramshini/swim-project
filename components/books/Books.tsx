"use client";
import React, { useMemo } from "react";
import BookInterface from "./BookInterface";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetBooks } from "@/features/book/api/use-get-books";

const books = [
  {
    id: 1,
    title: "مثنوی معنوی",
    slug: "masnavi-manavi",
    thumbnail: "https://example.com/masnavi.jpg",
    description:
      "یکی از بزرگ‌ترین آثار عرفانی و ادبیات فارسی نوشته مولانا جلال‌الدین بلخی.",
    bookComments: "کتاب فوق‌العاده‌ای برای درک مفاهیم عرفانی است.",

    price: 250000,
    ISBN: "978-600-119-429-6",
    editionNo: 5,
    state: "نو",
    pageCount: 700,
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 2,
    title: "بوف کور",
    slug: "buffe-kor",
    thumbnail: "https://example.com/buffe-kor.jpg",
    description:
      "رمان معروف صادق هدایت که اثری سورئالیستی و تاثیرگذار در ادبیات فارسی است.",
    bookComments: "کتابی مرموز و عمیق که ذهن را درگیر می‌کند.",

    price: 180000,
    ISBN: "978-964-448-049-1",
    editionNo: 3,
    state: "دست دوم",
    pageCount: 150,
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 3,
    title: "شاهنامه",
    slug: "shahnameh",
    thumbnail: "https://example.com/shahnameh.jpg",
    description:
      "حماسه ملی ایران، نوشته فردوسی که داستان‌های شاهان و پهلوانان ایران را روایت می‌کند.",
    bookComments: "یکی از ارزشمندترین آثار ادبی ایران.",

    price: 400000,
    ISBN: "978-964-305-379-5",
    editionNo: 10,
    state: "نو",
    pageCount: 1000,
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 4,
    title: "شاهنامه",
    slug: "shahnameh",
    thumbnail: "https://example.com/shahnameh.jpg",
    description:
      "حماسه ملی ایران، نوشته فردوسی که داستان‌های شاهان و پهلوانان ایران را روایت می‌کند.",
    bookComments: "یکی از ارزشمندترین آثار ادبی ایران.",

    price: 400000,
    ISBN: "978-964-305-379-5",
    editionNo: 10,
    state: "نو",
    pageCount: 1000,
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 5,
    title: "شاهنامه",
    slug: "shahnameh",
    thumbnail: "https://example.com/shahnameh.jpg",
    description:
      "حماسه ملی ایران، نوشته فردوسی که داستان‌های شاهان و پهلوانان ایران را روایت می‌کند.",
    bookComments: "یکی از ارزشمندترین آثار ادبی ایران.",

    price: 400000,
    ISBN: "978-964-305-379-5",
    editionNo: 10,
    state: "نو",
    pageCount: 1000,
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 6,
    title: "شاهنامه",
    slug: "shahnameh",
    thumbnail: "https://example.com/shahnameh.jpg",
    description:
      "حماسه ملی ایران، نوشته فردوسی که داستان‌های شاهان و پهلوانان ایران را روایت می‌کند.",
    bookComments: "یکی از ارزشمندترین آثار ادبی ایران.",

    price: 400000,
    ISBN: "978-964-305-379-5",
    editionNo: 10,
    state: "نو",
    pageCount: 1000,
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 7,
    title: "شاهنامه",
    slug: "shahnameh",
    thumbnail: "https://example.com/shahnameh.jpg",
    description:
      "حماسه ملی ایران، نوشته فردوسی که داستان‌های شاهان و پهلوانان ایران را روایت می‌کند.",
    bookComments: "یکی از ارزشمندترین آثار ادبی ایران.",

    price: 400000,
    ISBN: "978-964-305-379-5",
    editionNo: 10,
    state: "نو",
    pageCount: 1000,
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
];

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
    <section className="h-[620px] lg:h-[750px] flex flex-col justify-start items-center my-20">
      <h2 className="text-5xl font-extrabold text-right mb-5">کتاب ها</h2>
      <Button variant={"ghost"} onClick={() => router.push("/books")}>
        <ArrowLeftCircle />
        <p>دیدن همه</p>
      </Button>
      <div className="w-3/4 lg:w-5/6 h-full flex flex-row justify-center items-center">
        <BookInterface data={normalizedBooks} slider={true} />
      </div>
    </section>
  );
};

export default Books;
