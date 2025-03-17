import { insertArticleSchema } from "@/db/schema/article/article";
import { z } from "zod";
import Profile from "./Profile";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

import useContentParser from "@/hooks/use-content-parser";
import { useGetCreators } from "@/features/creator/api/use-get-creators";
import { useGetCreator } from "@/features/creator/api/use-get-creator";

type Article = z.infer<typeof insertArticleSchema>;

interface Props {
  data: Article;
}

const ArticleInterface: React.FC<Props> = ({ data }) => {
  const authorId = data?.authorId ?? undefined;
  const translatorId = data?.translatorId ?? undefined;
  const editorId = data?.editorId ?? undefined;

  const { data: authorData, isLoading: authorLoading } = useGetCreator(
    authorId?.toString()
  );
  const { data: translatorData, isLoading: translatorLoading } = useGetCreator(
    translatorId?.toString()
  );
  const { data: editorData, isLoading: editorLoading } = useGetCreator(
    editorId?.toString()
  );

  const router = useRouter();
  const content = useContentParser(data.excerpt, true);
  console.log(data);

  return (
    <aside className="flex flex-col lg:flex-row-reverse border-b-2 mb-3">
      <div className="w-full lg:w-1/3 mb-5 ml-5">
        <div className="w-full h-[200px] lg:m-auto lg:w-full lg:h-[110px] mb-5 rounded-sm">
          <Skeleton className="w-full h-full" />
        </div>
        <div>
          <Profile
            fullName={
              authorLoading
                ? "در حال بارگذاری..."
                : authorData?.name ?? "ناشناس"
            }
            role={"نویسنده"}
            occupation={"استاد دانشگاه"}
            size="lg"
          />
        </div>
      </div>
      <div className="w-full lg:w-2/3 pb-10 text-center">
        <div className="text-2xl font-bold text-right pb-3">{data.title}</div>
        <div className="text-right">{content}</div>
        <div className="w-full flex justify-start">
          <Button
            variant={"ghost"}
            onClick={() => router.push(`/articles/${data.slug}`)}
          >
            بیشتر
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default ArticleInterface;
