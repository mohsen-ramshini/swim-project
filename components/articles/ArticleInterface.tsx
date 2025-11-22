import { insertArticleSchema } from "@/db/schema/article/article";
import { z } from "zod";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import useContentParser from "@/hooks/use-content-parser";
import { useGetCreator } from "@/features/creator/api/use-get-creator";

type Article = z.infer<typeof insertArticleSchema>;

interface Props {
  data: Article;
  isLoading?: boolean; // پراپ isLoading اضافه شد
}

const ArticleInterface: React.FC<Props> = ({ data, isLoading = false }) => {
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

  if (isLoading) {
    return (
      <aside className="flex flex-col lg:flex-row-reverse border-b-2 pb-5">
        {/* تصویر Skeleton */}
        <div className="w-full lg:w-1/3 mb-5 ml-5">
          <div className="w-full h-[200px] lg:m-auto lg:w-full lg:h-[110px] mb-5 rounded-sm">
            <Skeleton className="w-full h-full" />
          </div>
          <div>
            <Profile
              fullName=""
              isLoading={true}
              role=""
              occupation=""
              size="sm"
            />
          </div>
        </div>

        {/* متن و عنوان Skeleton سمت راست */}
        <div className="w-full lg:w-2/3 pb-10 flex flex-col gap-2 items-end">
          <Skeleton className="h-6 w-3/4 mb-2" /> {/* عنوان */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" /> {/* متن طولانی‌تر */}
        </div>
      </aside>
    );
  }

  return (
    <aside className="flex flex-col lg:flex-row-reverse border-b-2 pb-5">
      <div className="w-full lg:w-1/3 mb-5 ml-5">
        <div className="w-full h-[200px] lg:m-auto lg:w-full lg:h-[110px] mb-5 rounded-sm">
          <Skeleton className="w-full h-full" />{" "}
          {/* می‌تونی thumbnail واقعی قرار بدی */}
        </div>
        <div>
          <Profile
            fullName={"ناشناس"}
            isLoading={authorLoading}
            role={"نویسنده"}
            occupation={"استاد دانشگاه"}
            size="sm"
          />
        </div>
      </div>

      <div className="w-full lg:w-2/3 pb-10 text-right">
        <div className="text-2xl font-bold text-right pb-3">{data.title}</div>
        <div className="text-right">{content}</div>
        <div className="w-full flex justify-start mt-3">
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
