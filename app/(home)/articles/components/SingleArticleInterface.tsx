"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { insertArticleSchema } from "@/db/schema/article";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import Profile from "../../components/articles/Profile";

type Article = z.infer<typeof insertArticleSchema>;

interface Props {
  data: Article;
}

const getCategoryContentById = (cat: number) => {
  switch (cat) {
    case 1:
      return "بدنسازی شنا";
    case 2:
      return "آناتومی شنا";
    case 3:
      return "تغذیه";
    default:
      return "بدون دسته بندی";
  }
};

const SingleArticleInterface: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const Category = getCategoryContentById(data.categoryId);

  return (
    <aside className="flex flex-col w-full h-15 mt-15 mt-16">
      <div className=" flex flex-col-reverse items-end lg:flex-row-reverse text-right mb-2 ">
        <div className="w-full lg:w-3/4 ">
          <div className="text-gray-400 font-thin">date</div>
          <div className="font-extrabold text-3xl">{data.title}</div>
          <div className="flex justify-end">
            <div className="w-32 h-12 flex justify-center items-center rounded-md bg-slate-300 opacity-80 my-5 font-semibold text-lg">
              {Category}
            </div>
          </div>
          <div className="w-full lg:block ">
            <Profile />
          </div>
        </div>
        <div className="w-full h-[180px] mb-5 lg:mb-0 lg:w-1/4 lg:h-[120px] rounded-sm">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
      <div className="text-right">{data.content}</div>
      <div>
        {/* Add navigation to the button */}
        <Button
          variant="ghost"
          onClick={() => router.push(`/articles/${data.slug}`)}
        >
          <ArrowLeft />
          ادامه
        </Button>
      </div>
    </aside>
  );
};

export default SingleArticleInterface;
