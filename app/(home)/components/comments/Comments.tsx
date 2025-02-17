import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { insertArticleCommentsSchema } from "@/db/schema/articleComments";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import BookDetails from "../books/BookDetails";
import CommentsInterface from "./CommentsInterface";
import { insertBookSchema } from "@/db/schema/book/book";

type Book = z.infer<typeof insertBookSchema>;

interface Props {
  book: Book;
  slider: boolean;
}

const Comments: React.FC<Props> = ({ book, slider }) => {
  return (
    <section>
      {/* TODO : fix book comments schema  */}
      {/* <CommentsInterface data={book.bookComments} slider={slider} /> */}
      <CommentsInterface data={book.bookComments} slider={slider} />
    </section>
  );
};

export default Comments;
