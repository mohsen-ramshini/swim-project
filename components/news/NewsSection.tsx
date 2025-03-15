"use client";
import React, { useMemo, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Profile from "../articles/Profile";
import NewsSingleInterface from "./NewsSingleInterface";
import { useGetNewsBySlug } from "@/features/news/api/use-get-news-by-slug";
import useParsedContent from "@/hooks/use-content-parser";
import { useGetNews } from "@/features/news/api/use-get-news";
import moment from "jalali-moment";
import { Button } from "../ui/button";

interface Props {
  slug: string;
}

const defaultNews = {
  title: "",
  slug: "",
  author: "",
  date: new Date(),
  content: "",
  banner: "",
  publishDate: new Date(),
  modifiedBy: 0,
  modifiedAt: new Date(),
  createdBy: 0,
  createdAt: new Date(),
  isActive: true,
};

const formatJalaliDate = (date: string | Date) => {
  const isoString = date instanceof Date ? date.toISOString() : date;
  return moment(isoString).locale("fa").format("YYYY/MM/DD");
};

const NewsSection: React.FC<Props> = ({ slug }) => {
  const {
    data: News = defaultNews,
    isLoading,
    isError,
  } = useGetNewsBySlug(slug);
  const { data: AllNews = [] } = useGetNews();
  const content = useParsedContent(News.content, true);
  const [VisibleNewsCount, setVisibleNewsCount] = useState(3);

  const normalizedNews = useMemo(() => {
    return (
      AllNews?.map((news) => ({
        ...news,
        createdAt: new Date(news.createdAt),
        modifiedAt: news.modifiedAt ? new Date(news.modifiedAt) : undefined,
        publishDate: news.publishDate ? new Date(news.publishDate) : undefined,
        date: news.date ? new Date(news.date) : undefined,
      })) || []
    );
  }, [AllNews]);

  const showMoreBooks = () => {
    setVisibleNewsCount((prev) => prev + 2);
  };
  const showLessBooks = () => {
    setVisibleNewsCount(3);
  };

  return (
    <div>
      {" "}
      <div className="w-full pt-20 text-center m-auto flex flex-col items-center">
        <div className="w-3/4 lg:w-2/3 mt-20">
          <div className="flex flex-col-reverse  justify-center items-center mb-14">
            <span className="text-gray-400 font-medium text-xl lg:text-2xl">
              {News?.date ? formatJalaliDate(News.date) : "تاریخ نامشخص"} تاریخ
              انتشار
            </span>
            <h1 className="font-extrabold text-3xl lg:text-5xl mb-10">
              {News.title}
            </h1>
            <div className="w-full h-[200px] lg:w-[960px] lg:h-[450px] m-auto my-10">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <Profile fullName="محسن رامشینی" size="lg" />
          <div className="text-right font-bold text-2xl lg:text-3xl my-5">
            {/* {News.excerpt} */}
          </div>
          <div className="text-right font-semibold text-md lg:text-lg">
            {content}
          </div>
        </div>
        <div className="w-2/3">
          <h3 className="text-xl font-semibold my-20">اخبار </h3>
          <div className="mb-20">
            {normalizedNews.slice(0, VisibleNewsCount).map((related) => (
              <NewsSingleInterface data={related} key={related.id} />
            ))}
            <div className="w-full text-center my-5 ">
              {VisibleNewsCount < normalizedNews.length ? (
                <Button
                  onClick={showMoreBooks}
                  variant={"ghost"}
                  className="w-full px-12"
                >
                  مشاهده بیشتر
                </Button>
              ) : (
                normalizedNews.length !== 2 && (
                  <Button
                    onClick={showLessBooks}
                    variant={"ghost"}
                    className="w-full px-12"
                  >
                    مشاهده کمتر
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
