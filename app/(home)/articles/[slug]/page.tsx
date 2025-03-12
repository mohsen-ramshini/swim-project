import ArticleContent from "@/components/articles/ArticleContent";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  console.log(slug);

  return <ArticleContent slug={slug} />;
}
