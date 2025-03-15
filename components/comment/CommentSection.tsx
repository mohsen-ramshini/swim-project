import React from "react";
import CommentInterface from "./CommentInterface";

const comments = [
  {
    id: 1,
    articleId: 1,
    parentId: null,
    userId: 2,
    createDate: new Date(),
    text: "این مقاله خیلی مفید بود، ممنون!",
  },
  {
    id: 2,
    articleId: 1,
    parentId: 1,
    userId: 3,
    createDate: new Date(),
    text: "موافقم، نکات جالبی داشت.",
  },
  {
    id: 3,
    articleId: 1,
    parentId: null,
    userId: 4,
    createDate: new Date(),
    text: "یکم بیشتر توضیح بدید درباره این بخش.",
  },
  {
    id: 4,
    articleId: 2,
    parentId: null,
    userId: 5,
    createDate: new Date(),
    text: "این مقاله خیلی جذاب بود، ممنون بابت اشتراک‌گذاری.",
  },
  {
    id: 5,
    articleId: 2,
    parentId: 4,
    userId: 6,
    createDate: new Date(),
    text: "دقیقا، مخصوصا بخش آخرش خیلی کاربردی بود.",
  },
  {
    id: 6,
    articleId: 1,
    parentId: 3,
    userId: 7,
    createDate: new Date(),
    text: "فکر کنم توی منابع خارجی توضیحات تکمیلی پیدا بشه.",
  },
];

const CommentSection = () => {
  return (
    <aside className="flex flex-col items-center w-full my-10 ">
      <div className="flex flex-row-reverse items-baseline gap-1 p-2">
        <h5 className="text-2xl sm:text-4xl font-bold">نظرات</h5>
        <span className="rounded-3xl w-10 sm:w-14 h-8 sm:h-10 bg-secondary flex justify-center items-center text-white">
          {comments.length}
        </span>
      </div>
      <div className="w-full sm:w-4/5  flex flex-col items-end">
        {comments.map((comment) => (
          <CommentInterface key={comment.id} data={comment} />
        ))}
      </div>
    </aside>
  );
};

export default CommentSection;
