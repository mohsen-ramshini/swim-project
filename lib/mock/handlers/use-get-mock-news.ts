import { mockQuery } from "./mockQuery";
import { mockNews } from "../data/mockNews";

/* ----------------------- News ----------------------- */

export const getNews = async () => {
  return mockQuery(() => mockNews, 1000);
};

export const getNewsById = async (id: number) => {
  return mockQuery(() => {
    const newsItem = mockNews.find((n) => n.id === id);

    if (!newsItem) {
      throw new Error("News not found");
    }

    return newsItem;
  }, 1200);
};

/* -------------------- Optional: Get by Slug -------------------- */

export const getNewsBySlug = async (slug: string) => {
  return mockQuery(() => {
    const newsItem = mockNews.find((n) => n.slug === slug);

    if (!newsItem) {
      throw new Error("News not found");
    }

    return newsItem;
  }, 1200);
};
