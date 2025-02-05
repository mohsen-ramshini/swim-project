import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { insertArticleSchema } from "@/db/schema/article";
import { ArrowLeft } from "lucide-react";
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
  const Category = getCategoryContentById(data.categoryId);

  return (
    <aside className="flex flex-col w-full h-15 mt-15 mt-16">
      <div className=" flex flex-row-reverse text-right mb-2">
        <div className="w-3/4 ">
          <div className="text-gray-400 font-thin">date</div>
          <div className="font-extrabold text-3xl">{data.title}</div>
          <div>{Category}</div>
          <div>
            <Profile />
          </div>
        </div>
        <div className="w-1/4 h-[120px] rounded-sm">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
      <div className="text-right">{data.content}</div>
      <div className="">
        <Button variant={"ghost"}>
          <ArrowLeft />
          ادامه
        </Button>
      </div>
    </aside>
  );
};

export default SingleArticleInterface;
