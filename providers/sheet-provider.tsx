"use client";

import { NewCategorySheet } from "@/features/articleCategory/components/sheet/new-category-sheet";
import { EditCategorySheet } from "@/features/articleCategory/components/sheet/edit-category-sheet";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewCategorySheet />
      <EditCategorySheet />
    </>
  );
};
