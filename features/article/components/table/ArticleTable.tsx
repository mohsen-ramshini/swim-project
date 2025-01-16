import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetArticles } from "@/features/article/api/use-get-articles";
import { useNewArticle } from "@/features/article/hook/use-new-article";

import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteArticles } from "@/features/article/api/use-bulk-delete";
import { NewArticleSheet } from "@/features/article/components/sheet/new-article-sheet";

const ArticleTable = () => {
  const newArticle = useNewArticle();
  const deleteArticles = useBulkDeleteArticles();
  const article = useGetArticles();
  const Article = article.data || [];

  const isDisabled = article.isLoading || deleteArticles.isPending;

  if (article.isLoading) {
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
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">مقالات</CardTitle>
          {/* Trigger Button */}
          <Button size="sm" onClick={newArticle.onOpenArticle}>
            ایجاد
            <Plus className="size-4 mr-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={Article}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id.toString());
              deleteArticles.mutate({ ids });
            }}
            disabled={isDisabled}
            filterKey="title"
          />
        </CardContent>
      </Card>
      <NewArticleSheet />
    </div>
  );
};

export default ArticleTable;
