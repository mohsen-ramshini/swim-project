import React from "react";
import Profile from "../articles/Profile";
import { z } from "zod";
import { insertArticleCommentsSchema } from "@/db/schema/article/articleComments";
import moment from "jalali-moment";
import useParsedContent from "@/hooks/use-content-parser";

type Comment = z.infer<typeof insertArticleCommentsSchema>;

interface Props {
  data: Comment;
}

const formatJalaliDate = (isoDate: string) => {
  return moment(isoDate).locale("fa").format("YYYY/MM/DD");
};

const CommentInterface: React.FC<Props> = ({ data }) => {
  const content = useParsedContent(data.text, false);
  return (
    <div className="w-full sm:w-4/5 p-4 border-b flex flex-col justify-start">
      <div className="flex flex-row-reverse items-center gap-2">
        <Profile fullName="محسن رامشینی" size="lg" />
        <div className="text-sm text-gray-500">
          {data.createDate
            ? formatJalaliDate(data.createDate.toISOString())
            : "بدون تاریخ"}
        </div>
      </div>
      <div className="w-full p-3 text-right rtl">{content}</div>
    </div>
  );
};

export default CommentInterface;
