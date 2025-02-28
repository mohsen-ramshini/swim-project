import ArticleContent from "@/components/articles/ArticleContent";

interface Props {
  params: { slug: string };
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return <ArticleContent slug={slug} />;
}
