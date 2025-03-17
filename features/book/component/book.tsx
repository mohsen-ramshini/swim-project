import React from "react";
import BookTable from "./table/BookTable";
import { useGetCategories } from "@/features/articleCategory/api/use-get-categories";

const Book = () => {
  const { data: categories } = useGetCategories();
  return (
    <div className="overflow-y-auto">
      <BookTable />
    </div>
  );
};

export default Book;
