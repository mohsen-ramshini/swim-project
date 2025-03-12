import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetCreators } from "@/features/creator/api/use-get-creators";
import { useNewCreator } from "@/features/creator/hook/use-new-creator";

import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeletecreators } from "@/features/creator/api/use-bulk-delete";
import { NewCreatorSheet } from "@/features/creator/component/sheet/new-creator-sheet";

const CreatorTable = () => {
  const newCreator = useNewCreator();
  const deleteCreator = useBulkDeletecreators();
  const creator = useGetCreators();
  const Creator = creator.data || [];

  const isDisabled = creator.isLoading || deleteCreator.isPending;

  if (creator.isLoading) {
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
          <CardTitle className="w-11/12 text-xl line-clamp-1">
            پدید اورنده
          </CardTitle>
          {/* Trigger Button */}
          <div className="w-[200px] sm:w-1/2 lg:w-1/3 xl:w-3/4"></div>
          <Button
            size="sm"
            onClick={newCreator.onOpenCreator}
            className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            ایجاد
            <Plus className="size-4 mr-2" />
          </Button>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={Creator}
            onDelete={(row) => {
              const ids = row.map((r) => Number(r.original.id));
              deleteCreator.mutate({ ids });
            }}
            disabled={isDisabled}
            filterKey="title"
          />
        </CardContent>
      </Card>
      <NewCreatorSheet />
    </div>
  );
};

export default CreatorTable;
