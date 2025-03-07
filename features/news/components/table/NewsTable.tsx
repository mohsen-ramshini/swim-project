import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetNews } from "@/features/news/api/use-get-news";
import { useNewNews } from "@/features/news/hook/use-new-news";

import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteNews } from "@/features/news/api/use-bulk-delete";
import { NewNewsSheet } from "@/features/news/components/sheet/new-news-sheet";

const NewsTable = () => {
  const newNews = useNewNews();
  const deleteNews = useBulkDeleteNews();
  const news = useGetNews();
  const News = news.data || [];

  const isDisabled = news.isLoading || deleteNews.isPending;

  if (news.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      {/* Card Component */}
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="w-full flex flex-row items-baseline justify-between lg:items-center">
          <CardTitle className="w-11/12 text-xl line-clamp-1">اخبار</CardTitle>
          {/* Trigger Button */}
          <div className="w-[200px] sm:w-1/2 lg:w-1/3 xl:w-3/4"></div>
          <Button
            size="sm"
            onClick={newNews.onOpenNews}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            ایجاد
            <Plus className="size-4 mr-2" />
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={News}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id.toString());
              deleteNews.mutate({ ids });
            }}
            disabled={isDisabled}
            filterKey="title"
          />
        </CardContent>
      </Card>
      <NewNewsSheet />
    </div>
  );
};

export default NewsTable;
