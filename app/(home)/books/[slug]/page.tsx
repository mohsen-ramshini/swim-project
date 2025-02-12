import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftCircle, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import Profile from "../../components/articles/Profile";
import BookInterface from "../../components/books/BookInterface";

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
  {
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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

export default async function BookPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const book = books.find((post) => post.slug === slug);
  if (!book) return notFound();

  const bookId = Number(book.id);
  if (isNaN(bookId)) return notFound();

  //   const relatedArticles = books.filter(
  //     (item) => item.categoryId === article.categoryId && item.id !== articleId
  //   );

  return (
    <section className="w-full lg:h-[1750px] flex flex-col mt-10 justify-center items-center">
      <h2 className="text-5xl font-extrabold my-5">مشخصات کتاب</h2>
      <div className=" w-11/12 h-full">
        <div className=" flex flex-row-reverse justify-center items-center h-1/6 text-center">
          <div className="w-3/5  flex flex-row-reverse">
            <div className=" w-1/2 ">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="mr-5 w-1/2 text-right">
              <h4 className="text-3xl">{book.title}</h4>
              <div>
                <p>نوسنده : دکتر مرتضی</p>
                <p>مترجم : دکتر مرتضی</p>
                <p>انتشارات : راه نوین</p>
                <p>دسته بندی : بیومکانیک شنا</p>
                <Button variant={"ghost"} className="text-blue-400">
                  خواندن نظرات
                </Button>
              </div>
            </div>
          </div>
          <div className="w-2/5 flex flex-col bg-gray-200 p-5 rounded-sm">
            <div className="flex flex-row-reverse justify-around items-center">
              <div className="flex flex-col">
                <p>شماره انتشار</p>
                <p>شماره شابک</p>
                <p>سال انتشار</p>
                <p>تعداد صفحات</p>
                <p>قیمت</p>
              </div>
              <div className="flex flex-col">
                <p>{book.editionNo}</p>
                <p>{book.ISBN}</p>
                <p>{book.pageCount}</p>
                <p>date</p>
                {/* TODO : publish time gets type error fix it */}
                <p>{book.price}</p>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <Button variant={"ghost"}>
                <Share2 />
              </Button>
              <Button variant={"secondary"} className="text-white">
                خرید کتاب
              </Button>
            </div>
          </div>
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
                <Profile />
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
                <Profile />
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
                <Profile />
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
          <h6>
            <BookInterface data={books} slider={true} />
          </h6>
        </div>
      </div>
    </section>
  );
}
