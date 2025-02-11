import React from "react";
import BookInterface from "../components/books/BookInterface";

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
  return (
    <section className="h-screen w-full bg-red-800 flex justify-center items-center">
      <div>
        <BookInterface data={books} slider={false} />
      </div>
    </section>
  );
};

export default Books;
