"use client";
import React, { useEffect, useState } from "react";
import HeadArticle from "./HeadArticle";
import ArticleInterface from "./ArticleInterface";
import { useGetArticles } from "@/features/article/api/use-get-articles";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowLeftCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { insertArticleSchema } from "@/db/schema/article";
import { z } from "zod";

type ArticleInterface = z.infer<typeof insertArticleSchema>;

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const Articles = () => {
  const Articles = [
    {
      id: 1,
      articleType: 1,
      title: "مزیای شنا برای سلامتی",
      slug: "swimming-advanteage",
      thumbnail:
        "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
      excerpt: "test",
      content:
        "شنا یک ورزش کم‌فشار است که تأثیر زیادی بر سلامت قلب و عروق، افزایش ظرفیت تنفسی و تقویت عضلات دارد. این ورزش به کاهش استرس، بهبود انعطاف‌پذیری و افزایش استقامت بدنی کمک می‌کند. همچنین برای افراد مبتلا به مشکلات مفصلی یا کمردرد، گزینه‌ای ایده‌آل است",
      categoryId: 1,
      reference: "1",
      publishTime: new Date(),
      isActive: true,
      createdBy: 12,
      createdAt: new Date(),
      modifiedBy: 12,
      modifiedAt: new Date(),
    },
    {
      id: 2,
      articleType: 1,
      title: "شنا برای مبتدیان",
      slug: "swimming-for-begginers",
      thumbnail:
        "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
      excerpt: "test",
      content:
        "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
      categoryId: 2,
      reference: "1",
      publishTime: new Date(),
      isActive: true,
      createdBy: 12,
      createdAt: new Date(),
      modifiedBy: 12,
      modifiedAt: new Date(),
    },
    {
      id: 3,
      articleType: 1,
      title: "شنا برای مبتدیان",
      slug: "swimming-for-begginers",
      thumbnail:
        "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
      excerpt: "test",
      content:
        "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
      categoryId: 2,
      reference: "1",
      publishTime: new Date(),
      isActive: true,
      createdBy: 12,
      createdAt: new Date(),
      modifiedBy: 12,
      modifiedAt: new Date(),
    },
    {
      id: 4,
      articleType: 1,
      title: "شنا برای مبتدیان",
      slug: "swimming-for-begginers",
      thumbnail:
        "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
      excerpt: "test",
      content:
        "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
      categoryId: 2,
      reference: "1",
      publishTime: new Date(),
      isActive: true,
      createdBy: 12,
      createdAt: new Date(),
      modifiedBy: 12,
      modifiedAt: new Date(),
    },
    {
      id: 5,
      articleType: 1,
      title: "شنا برای مبتدیان",
      slug: "swimming-for-begginers",
      thumbnail:
        "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
      excerpt: "test",
      content:
        "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
      categoryId: 2,
      reference: "1",
      publishTime: new Date(),
      isActive: true,
      createdBy: 12,
      createdAt: new Date(),
      modifiedBy: 12,
      modifiedAt: new Date(),
    },
    {
      id: 6,
      articleType: 1,
      title: "شنا برای مبتدیان",
      slug: "swimming-for-begginers",
      thumbnail:
        "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
      excerpt: "test",
      content:
        "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
      categoryId: 2,
      reference: "1",
      publishTime: new Date(),
      isActive: true,
      createdBy: 12,
      createdAt: new Date(),
      modifiedBy: 12,
      modifiedAt: new Date(),
    },
  ];
  const { data: fetchedArticles, isLoading } = useGetArticles();
  const isMobile = useMediaQuery("(max-width: 1280px)");
  const [headArticles, setHeadArticles] = useState<ArticleInterface[]>([]);
  const [middleArticle, setMiddleArticle] = useState<ArticleInterface[]>([]);
  const [otherArticles, setOtherArticles] = useState<ArticleInterface[]>([]);

  const router = useRouter();

  useEffect(() => {
    if (isMobile) {
      setOtherArticles(Articles.slice(0, 4));
      setHeadArticles([]);
      setMiddleArticle([]);
    } else {
      setHeadArticles(Articles.slice(0, 1));
      setMiddleArticle(Articles.slice(1, 2));
      setOtherArticles(Articles.slice(2));
    }
  }, [isMobile, fetchedArticles]);

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center w-full min-h-screen  p-4 mb-10">
      {/* Heading */}
      <h2 className="text-black text-3xl sm:text-4xl lg:text-5xl font-extrabold my-4 text-center">
        آخرین مقالات
      </h2>

      {/* View All Button */}
      <div className="w-full flex justify-center">
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-6 py-3 text-lg w-full sm:w-auto"
          onClick={() => router.push("/articles")}
        >
          <ArrowLeftCircle /> مشاهده همه
        </Button>
      </div>

      {/* Articles Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 w-full  bg-white p-4">
        {/* Other Articles */}
        <div className="w-full p-4 space-y-4 text-right sm:text-center ">
          {otherArticles.map((art) => (
            <ArticleInterface key={art.id} data={art} />
          ))}
        </div>

        {/* Main Article Section */}
        <div className="hidden w-full p-4 space-y-4 text-right sm:text-center xl:block ">
          {/* Head Articles */}
          {headArticles.map((art) => (
            <HeadArticle key={art.id} data={art} />
          ))}

          {/* Middle Articles */}
          {middleArticle.map((art) => (
            <ArticleInterface key={art.id} data={art} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
