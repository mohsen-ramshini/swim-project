import React from "react";
import { insertArticleSchema } from "@/db/schema/article";
import { z } from "zod";
import Image from "next/image";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Article = z.infer<typeof insertArticleSchema>;

interface Props {
  data: Article;
}

const ArticleInterface: React.FC<Props> = ({ data }) => {
  return (
    <aside className="flex flex-col lg:flex-row-reverse border-b-2 mb-3 ">
      <div className="w-full lg:w-1/3 mb-5 ">
        <div className="w-full h-[200px] lg:m-auto lg:w-[200px] lg:h-[110px]  mb-5 rounded-sm">
          <Skeleton className="w-full h-full" />
          {/* lazy loading - replace it with actual thumbnail */}
        </div>
        <div>
          <Profile />
        </div>
      </div>
      <div className="w-full lg:w-2/3 pb-10 text-center">
        <div className="text-2xl font-bold text-right pb-3">{data.title}</div>
        <div className="text-right">{data.content}</div>
        <Button variant={"ghost"} className=" lg:relative lg:-left-52">
          بیشتر
        </Button>
      </div>
    </aside>
  );
};

export default ArticleInterface;
