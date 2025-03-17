import React from "react";
import BookCommentForm from "./BookCommentForm";
import BookCommentSection from "./BookCommentSection";

interface Props {
  bookId: number;
}

const Comment: React.FC<Props> = ({ bookId }) => {
  // فقط زمانی که bookId معتبر است، کامپوننت‌ها را رندر می‌کنیم
  if (bookId === 0) {
    return <p>مقاله معتبر نیست.</p>;
  }

  return (
    <div className="mb-20 w-full flex justify-center">
      <div className="w-full sm:w-4/5 h-auto rounded-lg flex flex-col justify-center items-center">
        <div className="w-full sm:w-4/5 my-10 p-4 rounded-lg">
          <BookCommentForm ID={bookId} />
        </div>
        <div className="w-full sm:w-4/5 h-auto overflow-auto">
          <BookCommentSection ID={bookId} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
