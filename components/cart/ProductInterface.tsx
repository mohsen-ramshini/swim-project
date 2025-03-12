"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import ItemCounter from "./ItemCounter";
import { z } from "zod";
import { insertBookSchema } from "@/db/schema/book/book";

type Book = z.infer<typeof insertBookSchema>;

interface Props {
  book: Book[];
  controller: boolean;
}

const ProductInterface: React.FC<Props> = ({ book, controller }) => {
  const [itemCount, setItemCount] = useState<number>(0);

  const handleCount = (count: number) => {
    setItemCount(count);
  };

  return (
    <section className="w-full flex flex-col ">
      {book.length === 0 ? (
        <p className="text-center text-gray-500">هیچ کتابی یافت نشد</p>
      ) : (
        book.map((b) => (
          <div
            key={b.id}
            className="w-full flex flex-col md:flex-row-reverse justify-between items-center border-b py-2 "
          >
            {/* بخش اطلاعات کتاب */}
            <div className="w-full md:w-2/3 flex flex-row-reverse items-center gap-4">
              {/* تصویر کتاب */}
              <div className="mr-1 w-[180px] md:w-[200px] h-[150px] flex justify-end rounded-sm">
                <Skeleton className="w-full h-full" />
              </div>
              {/* عنوان و توضیحات */}
              <div className="flex flex-col">
                <p className="font-semibold text-right">{b.title}</p>
                <p className="text-gray-500 text-sm text-right">
                  {b.description}
                </p>
              </div>
            </div>

            {/* بخش قیمت و کنترلر */}
            <div className="w-full md:w-1/3 flex flex-col md:flex-row items-center justify-between mt-4 md:mt-0 order-last md:order-none ">
              <div className="font-bold ml-2">{b.price} تومان</div>
              {controller && (
                <div className="mt-2 md:mt-0">
                  <ItemCounter counter={handleCount} />
                </div>
              )}
            </div>
          </div>
        ))
      )}

      {/* دکمه حذف همه */}
      {book.length > 0 && controller && (
        <div className="w-full flex justify-center items-center my-5">
          <Button variant={"destructive"} className="w-full md:w-auto">
            <Trash />
            حذف همه
          </Button>
        </div>
      )}
    </section>
  );
};

export default ProductInterface;
