import { mockQuery } from "./mockQuery";
import { mockBooks } from "../data/mockBooks";
import { mockBookComments } from "../data/mockBookComments";

/* ----------------------- Books ----------------------- */

export const getBooks = async () => {
  return mockQuery(() => mockBooks, 1200);
};

export const getBookById = async (id: number) => {
  return mockQuery(() => {
    const book = mockBooks.find((b) => b.id === id);

    if (!book) {
      throw new Error("Book not found");
    }

    return book;
  }, 1500);
};

/* -------------------- Book Comments -------------------- */

export const getBookComments = async () => {
  return mockQuery(() => mockBookComments, 1000);
};

export const getCommentsByBookId = async (bookId: number) => {
  return mockQuery(() => {
    return mockBookComments.filter((c) => c.bookId === bookId);
  }, 1200);
};

export const getBookCommentById = async (id: number) => {
  return mockQuery(() => {
    const comment = mockBookComments.find((c) => c.id === id);

    if (!comment) {
      throw new Error("Book comment not found");
    }

    return comment;
  }, 1300);
};

export const getRepliesByParentId = async (parentId: number) => {
  return mockQuery(() => {
    return mockBookComments.filter((c) => c.parentId === parentId);
  }, 1100);
};
