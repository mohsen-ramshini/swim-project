import { use } from "react";
import ArticleContent from "@/components/articles/ArticleContent";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <ArticleContent slug={slug} />;
}
