import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetCategories } from "@/features/articleCategory/api/use-get-categories";
import { useNewCategory } from "../../hook/use-new-category";

import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategories } from "../../api/use-bulk-delete";

const ArticleCatTable = () => {
  const newArticle = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const articleCat = useGetCategories();
  const Categories = articleCat.data || [];

  const isDisabled = articleCat.isLoading || deleteCategories.isPending;

  if (articleCat.isLoading) {
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
    <div>
      {/* Card Component */}
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">دسته بندی ها</CardTitle>
          {/* Trigger Button */}
          <Button size="sm" onClick={newArticle.onOpenCategory}>
            ایجاد
            <Plus className="size-4 mr-2" />
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={Categories}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id.toString());
              deleteCategories.mutate({ ids });
            }}
            disabled={isDisabled}
            filterKey="title"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCatTable;
