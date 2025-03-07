import React from "react";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { insertNewsSchema } from "@/db/schema/news/news";
import useParsedContent from "@/hooks/use-content-parser";

type News = z.infer<typeof insertNewsSchema>;

interface Props {
  news: News;
}

const NewsContent: React.FC<Props> = ({ news }) => {
  const router = useRouter();
  const content = useParsedContent(news.content, true);

  return (
    <div className="w-full px-4">
      <div className="flex flex-col md:flex-row-reverse border-b-2 min-h-44 my-5">
        {/* بخش تصویر */}
        <div className="w-full md:w-1/5 mb-2">
          <Skeleton className="w-full h-48 md:h-full rounded-md" />
        </div>

        {/* بخش متن خبر */}
        <div className="w-full md:w-4/5 flex flex-col mt-4 md:mt-0 md:mr-5">
          <div className="text-right font-semibold text-xl md:text-2xl">
            {news.title}
          </div>
          <div className="text-right mt-2 text-sm md:text-base">{content}</div>
          <div className="flex items-start mt-3">
            <Button
              variant="ghost"
              onClick={() => router.push(`/news/${news.slug}`)}
            >
              مشاهده
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsContent;
