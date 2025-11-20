"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import Profile from "../articles/Profile";
import NewsSingleInterface from "./NewsSingleInterface";
import useParsedContent from "@/hooks/use-content-parser";
import { Button } from "../ui/button";
import moment from "jalali-moment";
import { handlers } from "@/lib/mock";

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

interface Props {
  slug: string;
}

interface News {
  id: number;
  title: string;
  slug: string;
  author: string;
  date: Date;
  content: string;
  banner: string;
  publishDate: Date;
  modifiedBy: number;
  modifiedAt: Date;
  createdBy: number;
  createdAt: Date;
  isActive: boolean;
}

const defaultNews: News = {
  id: 0,
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
  const [news, setNews] = useState<News>(defaultNews);
  const [allNews, setAllNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  /* ---------------- Normalize news ---------------- */
  const normalizeNews = (data: any): News => ({
    id: data.id ?? 0,
    title: data.title ?? "",
    slug: data.slug ?? "",
    author: data.author ?? "",
    date: data.date ? new Date(data.date) : new Date(),
    content: data.content ?? "",
    banner: data.banner ?? "",
    publishDate: data.publishDate ? new Date(data.publishDate) : new Date(),
    modifiedBy: data.modifiedBy ?? 0,
    modifiedAt: data.modifiedAt ? new Date(data.modifiedAt) : new Date(),
    createdBy: data.createdBy ?? 0,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    isActive: data.isActive ?? true,
  });

  /* ---------------- Fetch single news ---------------- */
  useEffect(() => {
    const fetchNewsBySlug = async () => {
      setLoading(true);
      try {
        let res: any;
        if (USE_MOCK) {
          res = await handlers.news.getNewsBySlug(slug);
          setNews(res?.data ? normalizeNews(res.data) : defaultNews);
        } else {
          const apiRes = await fetch(`/api/news/${slug}`);
          const data = await apiRes.json();
          setNews(data ? normalizeNews(data) : defaultNews);
        }
      } catch (err) {
        console.error(err);
        setNews(defaultNews);
      } finally {
        setLoading(false);
      }
    };
    fetchNewsBySlug();
  }, [slug]);

  /* ---------------- Fetch all news ---------------- */
  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        let res: any;
        if (USE_MOCK) {
          res = await handlers.news.getNews();
          setAllNews(res?.data ? res.data.map(normalizeNews) : []);
        } else {
          const apiRes = await fetch("/api/news");
          const data = await apiRes.json();
          setAllNews(data ? data.map(normalizeNews) : []);
        }
      } catch (err) {
        console.error(err);
        setAllNews([]);
      }
    };
    fetchAllNews();
  }, []);

  const content = useParsedContent(news.content, true);

  const showMoreNews = () => setVisibleNewsCount((prev) => prev + 2);
  const showLessNews = () => setVisibleNewsCount(3);

  if (loading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="w-full pt-20 text-center m-auto flex flex-col items-center">
      <div className="w-3/4 lg:w-2/3 mt-20">
        <div className="flex flex-col-reverse justify-center items-center mb-14">
          <span className="text-gray-400 font-medium text-xl lg:text-2xl">
            {news?.date ? formatJalaliDate(news.date) : "تاریخ نامشخص"} تاریخ انتشار
          </span>
          <h1 className="font-extrabold text-3xl lg:text-5xl mb-10">{news.title}</h1>
          <div className="w-full h-[200px] lg:w-[960px] lg:h-[450px] m-auto my-10">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
      </div>

      <div className="w-2/3">
        <Profile fullName="محسن رامشینی" size="lg" />
        <div className="text-right font-bold text-2xl lg:text-3xl my-5">{/* excerpt */}</div>
        <div className="text-right font-semibold text-md lg:text-lg">{content}</div>
      </div>

      <div className="w-2/3">
        <h3 className="text-xl font-semibold my-20">اخبار مرتبط</h3>
        <div className="mb-20">
          {allNews.slice(0, visibleNewsCount).map((related) => (
            <NewsSingleInterface data={related} key={related.id} />
          ))}
          <div className="w-full text-center my-5">
            {visibleNewsCount < allNews.length ? (
              <Button onClick={showMoreNews} variant="ghost" className="w-full px-12">
                مشاهده بیشتر
              </Button>
            ) : (
              allNews.length > 2 && (
                <Button onClick={showLessNews} variant="ghost" className="w-full px-12">
                  مشاهده کمتر
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
