import React, { useMemo } from "react";
import BookCommentInterface from "./BookCommentInterface";
import { useGetBookComment } from "@/features/bookComment/api/use-get-book-comment";

interface Props {
  ID: number;
}

const BookCommentSection: React.FC<Props> = ({ ID }) => {
  if (!ID) {
    console.error("ID is undefined");
    return <p>Error: Invalid ID</p>;
  }

  const {
    data: Comments,
    isLoading,
    isError,
  } = useGetBookComment(ID.toString());

  const normalizedComments = useMemo(() => {
    if (!Comments || Comments === null) return [];

    return Comments.map((singleComment) => ({
      ...singleComment,
      createDate: new Date(singleComment.createDate),
    }));
  }, [Comments]);

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در بارگذاری نظرات</p>;

  return (
    <aside className="flex flex-col items-center w-full my-10 ">
      <div className="flex flex-row-reverse items-baseline gap-1 p-2">
        <h5 className="text-2xl sm:text-4xl font-bold">نظرات</h5>
        <span className="rounded-3xl w-10 sm:w-14 h-8 sm:h-10 bg-secondary flex justify-center items-center text-white">
          {Comments ? Comments.length : 0}
        </span>
      </div>
      <div className="w-full sm:w-4/5 flex flex-col items-end">
        {/* بررسی می‌کنیم که کامنت‌ها وجود دارند یا خیر */}
        {normalizedComments.map((comment) => (
          <BookCommentInterface key={comment.id} data={comment} />
        ))}
      </div>
    </aside>
  );
};

export default BookCommentSection;
