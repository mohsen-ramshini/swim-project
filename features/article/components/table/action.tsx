"use client";

import { useOpenArticle } from "@/features/article/hook/use-open-article";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useDeleteArticle } from "@/features/article/api/use-delete-article";
import { useConfirm } from "@/hooks/use-confirm";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are You Sure?",
    "this action will delete your article"
  );
  const deleteMutation = useDeleteArticle(id);
  const { onOpen } = useOpenArticle();

  const hadnleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            ویرایش
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={hadnleDelete}
          >
            <Trash className="size-4 mr-2" />
            حذف
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
