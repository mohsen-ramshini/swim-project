import React from "react";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { insertArticleSchema } from "@/db/schema/article";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

type Article = z.infer<typeof insertArticleSchema>;

interface Props {
  data: Article;
}

const HeadArticle: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  return (
    <aside className="w-full flex flex-col items-center lg:mb-5 lg:border-none border-b-2 mb-5 pb-10">
      {/* Responsive Image Container */}
      {/* Image */}
      <div className="w-full h-[200px] xl:w-[750px] xl:h-[455px] rounded-sm">
        <Skeleton className="w-full h-full" />
        {/* Lazy loading - replace it with actual thumbnail */}
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row-reverse w-full mt-5 px-4">
        {/* Title & Profile */}
        <div className="lg:w-1/2 flex-col  lg:flex-row-reverse  text-right lg:text-right">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            {data.title}
          </h3>
          <div className="flex justify-end">
            <Profile />
          </div>
        </div>

        {/* Article Content & Button */}
        <div className="lg:w-1/2 text-center lg:text-right mt-4 lg:mt-0">
          <p className="text-right lg:text-sm md:text-base">{data.content}</p>
          <div className="flex justify-center lg:justify-end mt-3">
            <Button
              variant={"ghost"}
              onClick={() => router.push(`/articles/${data.id}`)}
            >
              بیشتر
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default HeadArticle;
