import * as articlesHandlers from "./handlers/use-get-mock-articles";
import * as booksHandlers from "./handlers/use-get-mock-books";
import * as newsHandlers from "./handlers/use-get-mock-news";
import * as creatorsHandlers from "./handlers/use-get-mock-creators";
import * as coursesHandler from "./handlers/use-get-mock-courses";

export const handlers = {
  articles: articlesHandlers,
  courses: coursesHandler,
  books: booksHandlers,
  news: newsHandlers,
  creators: creatorsHandlers,
};
