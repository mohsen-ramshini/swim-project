import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetTags } from "@/features/articleTag/api/use-get-tags";
import { useNewTag } from "@/features/articleTag/hook/use-new-tag";

import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTags } from "@/features/articleTag/api/use-bulk-delete";
import { NewTagSheet } from "../sheet/new-tag-sheet";

const ArticleTagTable = () => {
  const newArticle = useNewTag();
  const deleteTags = useBulkDeleteTags();
  const articleTag = useGetTags();
  const Tags = articleTag.data || [];

  const isDisabled = articleTag.isLoading || deleteTags.isPending;

  if (articleTag.isLoading) {
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
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      {/* Card Component */}
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">تگ ها</CardTitle>
          {/* Trigger Button */}
          <Button onClick={newArticle.onOpenTag}>
            <Plus className="size-4 mr-2" />
            ایجاد
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={Tags}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id.toString());
              deleteTags.mutate({ ids });
            }}
            disabled={isDisabled}
            filterKey="title"
          />
        </CardContent>
        {/* change this later */}
        {/* {newArticle.isTagOpen && <NewTagSheet />} */}
      </Card>
    </div>
  );
};

export default ArticleTagTable;
