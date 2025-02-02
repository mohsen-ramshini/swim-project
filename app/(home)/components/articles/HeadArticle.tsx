import React from "react";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { insertArticleSchema } from "@/db/schema/article";
import { Skeleton } from "@/components/ui/skeleton";

type Article = z.infer<typeof insertArticleSchema>;

interface Props {
  data: Article;
}

const HeadArticle: React.FC<Props> = ({ data }) => {
  return (
    <aside className="w-full h-full mb-14">
      <div className="m-auto w-[750px] h-[455px]  rounded-sm">
        <Skeleton className="w-full h-full" />
        {/* lazy loading - replace it with actual thumbnail */}
      </div>

      <div className="flex flex-row-reverse  mt-5">
        <div className="w-1/2">
          <h3 className="text-3xl font-bold mb-5">{data.title}</h3>
          <div className="mr-16">
            <Profile />
          </div>
        </div>
        <div className="w-1/2 ">
          <div className="text-right">{data.content}</div>
          <Button variant={"ghost"} className="relative -left-36">
            بیشتر
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default HeadArticle;
