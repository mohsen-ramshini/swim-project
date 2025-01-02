import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useGetArticles } from "@/features/articleCategory/api/use-get-article-cat";
import { useNewAccount } from "../../hook/useNewCat";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ArticleCategoryForm from "../form/ArticleCatForm";

const ArticleCatTable = () => {
  const newArticle = useNewAccount();
  const articleCat = useGetArticles();
  const Categories = articleCat.data || [];

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      {/* Dialog Component */}
      <Dialog
        open={newArticle.isOpen}
        onOpenChange={(isOpen) =>
          isOpen ? newArticle.onOpen() : newArticle.onClose()
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submit the form</DialogTitle>
            <DialogDescription>
              <ArticleCategoryForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Card Component */}
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
          {/* Trigger Button */}
          <Button onClick={newArticle.onOpen}>
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={Categories}
            onDelete={() => {}}
            disabled={false}
            filterKey="title"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleCatTable;
