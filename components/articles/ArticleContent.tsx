"use client";
import { notFound } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Profile from "@/components/articles/Profile";
import SingleArticleInterface from "@/components/articles/SingleArticleInterface";
import useContentParser from "@/hooks/use-content-parser";
import { useGetArticleBySlug } from "@/features/article/api/use-get-article-by-slug";
import { Card, CardContent } from "../ui/card";
import { Loader2 } from "lucide-react";

interface Props {
  slug: string;
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

export default function ArticleContent({ slug }: Props) {
  const { data: article, isLoading, error } = useGetArticleBySlug(slug);
  const excerpt = useContentParser(article?.excerpt ?? "", false);
  const content = useContentParser(article?.content ?? "", false);

  if (isLoading) {
    return (
      <div className="max-w-screen-3xl mx-auto w-full pb-10 mt-20">
        <Card className="border-none drop-shadow-sm">
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  if (error || !article) return notFound();

  return (
    <section className="w-full">
      <div className="w-full pt-20 text-center m-auto flex flex-col items-center">
        <div className="w-3/4 lg:w-2/3">
          <h1 className="font-extrabold text-3xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="w-full flex justify-center">
            <div className="w-24 h-12 lg:w-36 lg:h-16 flex justify-center items-center rounded-md bg-slate-300 opacity-80 my-5 font-semibold text-md lg:text-xl">
              {getCategoryContentById(article.categoryId)}
            </div>
          </div>
          <div className="w-full h-[200px] lg:w-[550px] lg:h-[250px] m-auto">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
        <div className="w-2/3">
          <Profile fullName="محسن رامشینی" size="lg" />
          <div className="text-right font-bold text-2xl lg:text-3xl my-5">
            {excerpt}
          </div>
          <div className="text-right font-semibold text-md lg:text-lg">
            {content}
          </div>
        </div>
        <div className="w-2/3">
          <h3 className="text-xl font-semibold my-20">مقالات مرتبط</h3>
          <div className="mb-20">
            {/* {relatedArticles.map((related) => (
              <SingleArticleInterface data={related} key={related.id} />
            ))} */}
          </div>
        </div>
      </div>
    </section>
  );
}
