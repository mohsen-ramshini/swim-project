import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { z } from "zod";
import { insertArticleSchema, insertCreatorSchema } from "@/db/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import useContentParser from "@/hooks/use-content-parser";
import { handlers } from "@/lib/mock";
import { useGetCreator } from "@/features/creator/api/use-get-creator";
import Image from "next/image";

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

type Article = z.infer<typeof insertArticleSchema>;
type CreatorType = z.infer<typeof insertCreatorSchema>;

interface Props {
  data: Article;
  isLoading?: boolean;
}

const HeadArticle: React.FC<Props> = ({ data, isLoading = false }) => {
  const [FetchedCreator, setFetchedCreator] = useState<CreatorType>();
  const [authorLoading, setAuthorLoading] = useState<boolean>();
  const router = useRouter();
  const content = useContentParser(data.excerpt, true);

  useEffect(() => {
    const fetchCreators = async () => {
      setAuthorLoading(true);
      try {
        let creators: CreatorType[] = [];

        if (USE_MOCK) {
          const res = await handlers.creators.getCreatorById(
            data?.authorId || 0
          );
          creators = Array.isArray(res.data)
            ? res.data
            : res.data
            ? [res.data]
            : [];
        } else {
          const res = await useGetCreator();
          // اینجا هم باید مشابه بالا داده را به آرایه تبدیل کنی
        }

        setFetchedCreator(creators[0]);
      } catch (err: any) {
        setError(err);
      } finally {
        setAuthorLoading(false);
      }
    };

    fetchCreators();
  }, []);

  if (isLoading) {
    return (
      <aside className="w-full flex flex-col items-center lg:mb-5 lg:border-none border-b-2 pb-2">
        <div className="w-full h-[200px] xl:h-[455px] rounded-sm">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex flex-col lg:flex-row-reverse w-full mt-5 px-4">
          <div className="lg:w-1/2 flex flex-col items-end text-right">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <div className="flex justify-end">
              <Profile
                fullName=""
                isLoading={true}
                size="lg"
                role=""
                occupation=""
              />
            </div>
          </div>
          <div className="lg:w-1/2 text-right mt-4 lg:mt-0 flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="w-full flex flex-col items-center lg:mb-5 lg:border-none border-b-2 pb-2 cursor-pointer"
      onClick={() => router.push(`/articles/${data.slug}`)}
    >
      <div className="w-full h-[200px] xl:h-[455px] rounded-sm">
        {/* می‌تونی این Skeleton رو با thumbnail واقعی جایگزین کنی */}
        <Image
          src={`${data?.thumbnail}`}
          alt=""
          width={700}
          height={50}
          className="rounded-sm"
        />
        {/* <Skeleton className="w-full h-full" /> */}
      </div>

      <div className="flex flex-col lg:flex-row-reverse w-full mt-5 px-4">
        <div className="lg:w-1/2 flex-col lg:flex-row-reverse text-right lg:text-right">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">
            {data.title}
          </h3>
          <div className="flex justify-end">
            <Profile
              fullName={`${FetchedCreator?.name}`}
              isLoading={authorLoading}
              size="lg"
              role={
                FetchedCreator?.author
                  ? "نویسنده"
                  : FetchedCreator?.editor
                  ? "تدوین گر"
                  : "مترجم"
              }
              occupation={"استاد دانشگاه"}
            />
          </div>
        </div>

        <div className="lg:w-1/2 text-center lg:text-right mt-4 lg:mt-0">
          <p className="text-right lg:text-sm md:text-base">{content}</p>
        </div>
      </div>
    </aside>
  );
};

export default HeadArticle;

function setError(err: any) {
  throw new Error("Function not implemented.");
}
