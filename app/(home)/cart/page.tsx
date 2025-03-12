"use client";
import React from "react";
import ShoppingStageBar from "../../../components/cart/ShoppingStageBar";
import BookDetails from "@/components/books/BookDetails";
import ProductInterface from "../../../components/cart/ProductInterface";
import { Button } from "@/components/ui/button";
import BookInterface from "@/components/books/BookInterface";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/hero/HeroSection";

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

const page = () => {
  const router = useRouter();
  return (
    <section className="w-full h-full flex flex-col justify-center items-center">
      <HeroSection imageSourse={"banner-three.jpg"} width={1920} height={680} />
      <div className="hidden md:block w-full h-1/4">
        <ShoppingStageBar activeStage={1} />
      </div>
      <h2 className="relative bottom-10 text-4xl md:text-5xl font-extrabold mt-16">
        سبد خرید
      </h2>
      <div className="w-full flex flex-col justify-center md:flex-row-reverse my-20 px-4 md:px-0">
        <div className="h-full w-full md:w-3/5 flex justify-center items-center ">
          <div className="border-2 rounded-sm w-full h-full flex flex-col justify-center items-center overflow-auto">
            <ProductInterface book={books.slice(0, 4)} controller={true} />
          </div>
        </div>
        <div className="h-full w-full md:w-1/5 flex justify-end mt-4 md:mt-0 md:mr-5">
          <div className="w-full h-full flex justify-center items-center">
            <div className="h-full w-full">
              <div className="h-4/5 border-2 rounded-sm w-full flex justify-center items-center">
                <div className="w-10/12 h-5/6 flex flex-col justify-center items-center">
                  <div className="w-full h-4/5 border-b-2 mb-1">
                    <p className="w-full h-1/4 text-right">جمع کل</p>
                    <p className="w-full h-1/4 text-center">price</p>
                    <p className="w-full h-1/4 text-right">تخفیف</p>
                    <p className="w-full h-1/4 text-center">0</p>
                  </div>
                  <div className="w-full h-1/5">
                    <p className="text-right">مبلغ قابل پرداخت</p>
                    <p className="text-center">price</p>
                  </div>
                </div>
              </div>
              <div className="h-1/5 w-full flex justify-center items-end mt-2">
                <Button
                  className="w-full"
                  onClick={() => router.push("/cart/address")}
                >
                  ادامه ثبت سفارش
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
