import { mockQuery } from "./mockQuery";
import { mockArticles } from "../data/mockArticles";
import { mockArticleCategories } from "../data/mockArticleCategories";
import { mockArticleComments } from "../data/mockArticleComments";
import { mockArticleTags } from "../data/mockArticleTags";

/* ----------------------- Articles ----------------------- */

export const getArticles = async () => {
  return mockQuery(() => mockArticles, 1200);
};

export const getArticleById = async (id: number) => {
  return mockQuery(() => {
    const article = mockArticles.find((item) => item.id === id);

    if (!article) {
      throw new Error("Article not found");
    }

    return article;
  }, 1500);
};

/* -------------------- Article Categories -------------------- */

export const getArticleCategories = async () => {
  return mockQuery(() => mockArticleCategories, 1000);
};

/* ----------------------- Article Tags ----------------------- */

export const getArticleTags = async () => {
  return mockQuery(() => mockArticleTags, 1000);
};

/* -------------------- Article Comments -------------------- */

export const getArticleComments = async () => {
  return mockQuery(() => mockArticleComments, 1000);
};

export const getCommentsByArticleId = async (articleId: number) => {
  return mockQuery(() => {
    return mockArticleComments.filter((c) => c.articleId === articleId);
  }, 1200);
};

export const getCommentById = async (id: number) => {
  return mockQuery(() => {
    const comment = mockArticleComments.find((c) => c.id === id);

    if (!comment) {
      throw new Error("Comment not found");
    }

    return comment;
  }, 1300);
};

export const getRepliesByParentId = async (parentId: number) => {
  return mockQuery(() => {
    return mockArticleComments.filter((c) => c.parentId === parentId);
  }, 1100);
};
