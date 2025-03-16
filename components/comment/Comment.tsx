import React from "react";
import CommentForm from "@/components/comment/CommentForm";
import CommentSection from "./CommentSection";

interface Props {
  articleID: number;
}

const Comment: React.FC<Props> = ({ articleID }) => {
  // فقط زمانی که articleID معتبر است، کامپوننت‌ها را رندر می‌کنیم
  if (articleID === 0) {
    return <p>مقاله معتبر نیست.</p>;
  }

  return (
    <div className="mb-20 w-full flex justify-center">
      <div className="w-full sm:w-4/5 h-auto rounded-lg flex flex-col justify-center items-center">
        <div className="w-full sm:w-4/5 my-10 p-4 rounded-lg">
          <CommentForm ID={articleID} />
        </div>
        <div className="w-full sm:w-4/5 h-auto overflow-auto">
          <CommentSection ID={articleID} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
