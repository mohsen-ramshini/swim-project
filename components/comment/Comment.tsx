import React from "react";
import CommentForm from "@/components/comment/CommentForm";
import CommentSection from "./CommentSection";

const Comment = () => {
  return (
    <div className="mb-20 w-full flex justify-center">
      <div className="w-full sm:w-4/5 h-auto rounded-lg flex flex-col justify-center items-center">
        <div className="w-full sm:w-4/5 my-10 p-4 rounded-lg">
          <CommentForm />
        </div>
        <div className="w-full sm:w-4/5 h-auto overflow-auto">
          <CommentSection />
        </div>
      </div>
    </div>
  );
};

export default Comment;
