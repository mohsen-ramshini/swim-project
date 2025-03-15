import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { insertBookSchema } from "@/db/schema/book/book";
import moment from "jalali-moment";
import { Book, Share2 } from "lucide-react";
import React, { useRef } from "react";
import { z } from "zod";

type Book = z.infer<typeof insertBookSchema>;

interface Props {
  data: Book;
}

const formatJalaliDate = (isoDate: string) => {
  return moment(isoDate).locale("fa").format("YYYY/MM/DD");
};

const BookDetails: React.FC<Props> = ({ data }) => {
  const commentsRef = useRef<HTMLDivElement>(null);

  const scrollToComments = () => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full flex flex-row-reverse">
      <div className="w-3/5 flex flex-row-reverse">
        <div className="w-1/2">
          <Skeleton className="w-[400px] h-[520px] max-w-96" />
        </div>
        <div className="mr-5 w-1/2 text-right">
          <h4 className="text-3xl">{data.title}</h4>
          <div>
            <p className="my-2">نویسنده : {data.author}</p>
            <p className="my-2">مترجم : دکتر مرتضی</p>
            <p className="my-2">انتشارات : راه نوین</p>
            <p className="my-2">دسته‌بندی : بیومکانیک شنا</p>
            {/* <Button
              variant={"ghost"}
              className="text-blue-400"
              onClick={scrollToComments}
            >
              خواندن نظرات
            </Button> */}
          </div>
        </div>
      </div>
      <div className="w-2/5 h-[250px] flex flex-col bg-gray-200 p-5 rounded-sm max-w-md">
        <div className="flex flex-row-reverse justify-around items-center text-right">
          <div className="flex flex-col text-xl ">
            <p>شماره انتشار</p>
            <p>شماره شابک</p>
            <p>سال انتشار</p>
            <p>تعداد صفحات</p>
            <p>قیمت</p>
          </div>
          <div className="flex flex-col text-xl">
            <p>{data.editionNo}</p>
            <p>{data.ISBN}</p>
            <p>
              {" "}
              {data?.publishTime
                ? formatJalaliDate(data.publishTime.toISOString())
                : "تاریخ نامشخص"}
            </p>
            <p>{data.pageCount}</p>
            <p>{data.price}</p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center">
          <Button variant={"ghost"}>
            <Share2 />
          </Button>
          <Button variant={"secondary"} className="text-white my-5">
            خرید کتاب
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
