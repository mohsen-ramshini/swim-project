"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { insertArticleSchema } from "@/db/schema/article/article";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import Profile from "./Profile";
import useContentParser from "@/hooks/use-content-parser";
import { useGetCategories } from "@/features/articleCategory/api/use-get-categories";
import { useGetArticlesByCategory } from "@/features/article/api/use-get-artilce-by-category";
import { useGetCreator } from "@/features/creator/api/use-get-creator"; // Assuming the hook is available
import moment from "jalali-moment";

type Article = z.infer<typeof insertArticleSchema>;

interface Props {
  data?: Article;
  categoryId?: number;
  mustRemove?: Article;
}

const formatJalaliDate = (isoDate: string) => {
  return moment(isoDate).locale("fa").format("YYYY/MM/DD");
};

const SingleArticleInterface: React.FC<Props> = ({
  data,
  categoryId,
  mustRemove,
}) => {
  const router = useRouter();
  const [relatedArticleCount, setRelatedArticleCount] = useState(3);
  const content = useContentParser(data?.content ?? "", true, 400);
  const [category, setCategory] = useState<string>();
  const { data: categories } = useGetCategories();
  const { data: relatedArticlesResponse } = useGetArticlesByCategory(
    categoryId ?? 0
  );
  const { data: authorData, isLoading: authorLoading } = useGetCreator(
    data?.authorId?.toString()
  );
  const relatedArticles = relatedArticlesResponse?.data ?? [];
  const filteredArticles = mustRemove
    ? relatedArticles.filter((art) => art.id !== mustRemove.id)
    : relatedArticles;

  const showMoreBooks = () => {
    setRelatedArticleCount((prev) => prev + 2);
  };
  const showLessBooks = () => {
    setRelatedArticleCount(3);
  };

  useEffect(() => {
    if (data) {
      setCategory(
        categories?.find((cat) => cat.id === data?.categoryId)?.title
      );
    }
  }, [categories, data]);

  if (data) {
    return (
      <aside className="flex flex-col w-full h-15 mt-15 mt-16">
        <div className="flex flex-col-reverse items-end lg:flex-row-reverse text-right mb-2">
          <div className="w-full lg:w-3/4">
            <div className="text-gray-400 font-thin">
              {" "}
              {data?.publishTime
                ? formatJalaliDate(data.publishTime.toISOString())
                : "تاریخ نامشخص"}
            </div>
            <div className="font-extrabold text-3xl">{data.title}</div>
            <div className="flex justify-end">
              <div className="w-32 h-12 flex justify-center items-center rounded-md bg-slate-300 opacity-80 my-5 font-semibold text-lg">
                {category}
              </div>
            </div>
            <Profile
              fullName={
                authorLoading
                  ? "در حال بارگذاری..."
                  : authorData?.name ?? "ناشناس"
              }
              size="lg"
              occupation="استاد دانشگاه"
              role="نویسنده"
            />
          </div>
          <div className="max-w-lg lg:max-w-6xl h-[180px] mb-5 lg:mb-0 lg:w-1/4 lg:h-[120px] rounded-sm">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
        <div className="text-right">{content}</div>
        <Button
          variant="ghost"
          onClick={() => router.push(`/articles/${data.slug}`)}
        >
          <ArrowLeft /> ادامه
        </Button>
      </aside>
    );
  }

  if (categoryId) {
    return (
      <aside className="flex flex-col w-full mt-16 items-end max-w-4xl m-auto">
        {filteredArticles.length > 0 ? (
          filteredArticles.slice(0, relatedArticleCount).map((art) => (
            <div key={art.id} className="border-b py-4 w-full text-center">
              <div className="font-extrabold text-xl sm:text-2xl text-right">
                {art.title}
                <div className="text-gray-400 font-thin text-right">
                  {art?.publishTime
                    ? formatJalaliDate(art.publishTime)
                    : "تاریخ نامشخص"}
                </div>
              </div>
              <div className="w-full flex flex-col sm:flex-row justify-between items-center">
                <div className=" text-right w-full sm:w-44 h-24">
                  <Skeleton className="w-full h-full" />
                </div>
                <div className="w-full">
                  <Profile
                    fullName="محسن رامشینی"
                    size="sm"
                    occupation="استاد دانشگاه"
                    role="نویسنده"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={() => router.push(`/articles/${art.slug}`)}
              >
                <ArrowLeft /> ادامه
              </Button>
            </div>
          ))
        ) : (
          <div>مقاله مرتبطی یافت نشد</div>
        )}
        <div className="w-full text-center my-5">
          {relatedArticleCount < filteredArticles.length ? (
            <Button
              onClick={showMoreBooks}
              variant={"ghost"}
              className="w-full sm:w-auto px-6"
            >
              مشاهده بیشتر
            </Button>
          ) : (
            filteredArticles.length > 3 && (
              <Button
                onClick={showLessBooks}
                variant={"ghost"}
                className="w-full sm:w-auto px-6"
              >
                مشاهده کمتر
              </Button>
            )
          )}
        </div>
      </aside>
    );
  }

  return null;
};

export default SingleArticleInterface;
