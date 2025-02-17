import { insertArticleCommentsSchema } from "@/db/schema/articleComments";
import React, { useState } from "react";
import { z } from "zod";

// هوک برای تشخیص سایز صفحه
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

type Comments = z.infer<typeof insertArticleCommentsSchema>;

interface Props {
  comments: string[];
  slider: boolean;
}

const chunkArray = (arr: Comments[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
};

const CommentsInterface: React.FC<Props> = ({ comments }) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const itemsPerSlide = isMobile ? 1 : 3;
  const groupedBooks = chunkArray(data, itemsPerSlide);

  const showMoreBooks = () => {
    setVisibleCount((prev) => prev + 6);
  };
  const showLessBooks = () => {
    setVisibleCount((prev) => (prev = 6));
  };

  return <aside>comments interface</aside>;
};

export default CommentsInterface;
