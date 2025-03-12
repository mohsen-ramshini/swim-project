"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { insertNewsSchema } from "@/db/schema/news/news";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import Profile from "@/components/articles/Profile";
import useParsedContent from "@/hooks/use-content-parser";
import moment from "jalali-moment";

type News = z.infer<typeof insertNewsSchema>;

interface Props {
  data: News;
}

const formatJalaliDate = (date: string | Date) => {
  const isoString = date instanceof Date ? date.toISOString() : date;
  return moment(isoString).locale("fa").format("YYYY/MM/DD");
};

const NewsSingleInterface: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const content = useParsedContent(data.content, true);

  return (
    <aside className="flex flex-col w-full h-auto mt-16">
      <div className="flex flex-col-reverse items-end lg:flex-row-reverse text-right mb-2">
        <div className="w-full lg:w-3/4">
          <div className="text-gray-400 font-thin">
            {data?.date ? formatJalaliDate(data.date) : "تاریخ نامشخص"}
          </div>
          <div className="font-extrabold text-3xl">{data.title}</div>

          <div className="w-full lg:block">
            <Profile fullName="محسن رامشینی" size="lg" />
          </div>
        </div>
        <div className="w-full h-[180px] mb-5 lg:mb-0 lg:w-1/4 lg:h-[120px] rounded-sm">
          <Skeleton className="w-full h-full" />
        </div>
      </div>
      <div className="text-right">{content}</div>
      <div>
        <Button
          variant="ghost"
          onClick={() => router.push(`/news/${data.slug}`)}
        >
          <ArrowLeft />
          ادامه
        </Button>
      </div>
    </aside>
  );
};

export default NewsSingleInterface;
