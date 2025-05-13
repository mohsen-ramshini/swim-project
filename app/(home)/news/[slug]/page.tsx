import { use } from "react";
import NewsSection from "@/components/news/NewsSection";

export default function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return (
    <section className="w-full">
      <NewsSection slug={slug} />
    </section>
  );
}
