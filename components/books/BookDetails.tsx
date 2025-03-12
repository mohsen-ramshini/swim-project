import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { insertBookSchema } from "@/db/schema/book/book";
import { Book, Share2 } from "lucide-react";
import React from "react";
import { z } from "zod";

type Book = z.infer<typeof insertBookSchema>;

interface Props {
  data: Book;
}

const BookDetails: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full h-full flex flex-row-reverse">
      <div className="w-3/5 flex flex-row-reverse">
        <div className="w-1/2">
          <Skeleton className="w-full h-full max-w-96" />
        </div>
        <div className="mr-5 w-1/2 text-right">
          <h4 className="text-3xl">{data.title}</h4>
          <div>
            <p>نویسنده : {"data"}</p>
            <p>مترجم : دکتر مرتضی</p>
            <p>انتشارات : راه نوین</p>
            <p>دسته‌بندی : بیومکانیک شنا</p>
            <Button variant={"ghost"} className="text-blue-400">
              خواندن نظرات
            </Button>
          </div>
        </div>
      </div>
      <div className="w-2/5 flex flex-col bg-gray-200 p-5 rounded-sm max-w-md">
        <div className="flex flex-row-reverse justify-around items-center">
          <div className="flex flex-col">
            <p>شماره انتشار</p>
            <p>شماره شابک</p>
            <p>سال انتشار</p>
            <p>تعداد صفحات</p>
            <p>قیمت</p>
          </div>
          <div className="flex flex-col">
            <p>{data.editionNo}</p>
            <p>{data.ISBN}</p>
            <p>date</p>
            <p>{data.pageCount}</p>
            <p>{data.price}</p>
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
  );
};

export default BookDetails;
