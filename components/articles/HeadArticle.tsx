import React from "react";
import Profile from "./Profile";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { insertArticleSchema } from "@/db/schema/article/article";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import useContentParser from "@/hooks/use-content-parser";
import { useGetCreator } from "@/features/creator/api/use-get-creator"; // Assuming this hook is available

type Article = z.infer<typeof insertArticleSchema>;

interface Props {
  data: Article;
}

const HeadArticle: React.FC<Props> = ({ data }) => {
  const { data: authorData, isLoading: authorLoading } = useGetCreator(
    data?.authorId?.toString()
  );
  const router = useRouter();
  const content = useContentParser(data.excerpt, true);
  console.log(data);

  return (
    <aside className="w-full flex flex-col items-center lg:mb-5 lg:border-none border-b-2 pb-2">
      {/* Responsive Image Container */}
      {/* Image */}
      <div className="w-full h-[200px] xl:h-[455px] rounded-sm">
        <Skeleton className="w-full h-full" />
        {/* Lazy loading - replace it with actual thumbnail */}
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row-reverse w-full mt-5 px-4">
        {/* Title & Profile */}
        <div className="lg:w-1/2 flex-col lg:flex-row-reverse text-right lg:text-right">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            {data.title}
          </h3>
          <div className="flex justify-end">
            <Profile
              fullName={
                authorLoading
                  ? "در حال بارگذاری..."
                  : authorData?.name ?? "ناشناس"
              }
              size="xl"
              role={"نویسنده"}
              occupation={"استاد دانشگاه"}
            />
          </div>
        </div>

        {/* Article Content & Button */}
        <div className="lg:w-1/2 text-center lg:text-right mt-4 lg:mt-0">
          <p className="text-right lg:text-sm md:text-base">{content}</p>
          <div className="flex justify-center lg:justify-start items-center mt-3">
            <Button
              variant={"ghost"}
              onClick={() => router.push(`/articles/${data.slug}`)}
            >
              بیشتر
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default HeadArticle;
