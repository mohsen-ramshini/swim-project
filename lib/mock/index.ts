import * as articlesHandlers from "./handlers/use-get-mock-articles";
import * as booksHandlers from "./handlers/use-get-mock-books";
import * as newsHandlers from "./handlers/use-get-mock-news";
import * as creatorsHandlers from "./handlers/use-get-mock-creators";

export const handlers = {
  articles: articlesHandlers,
  books: booksHandlers,
  news: newsHandlers,
  creators: creatorsHandlers,
};
