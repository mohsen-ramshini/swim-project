import { notFound } from "next/navigation";
import NewsSingleInterface from "@/components/news/NewsSingleInterface";
import { Skeleton } from "@/components/ui/skeleton";
import Profile from "@/components/articles/Profile";
import NewsSection from "@/components/news/NewsSection";

interface Props {
  params: { slug: string };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  return (
    <section className="w-full">
      <NewsSection slug={slug} />
    </section>
  );
}
