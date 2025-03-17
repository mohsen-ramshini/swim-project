import { Hono } from "hono";
import { handle } from "hono/vercel";
import Article from "./article";
import Category from "./articleCategory";
import ArticleComment from "./articleComments";
import Tag from "./articleTag";
import Book from "./book";
import News from "./news";
import Creator from "./creator";
import BookComment from "./bookComents";
import { HTTPException } from "hono/http-exception";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ error: "Internal server error", err }, 500);
});

const routes = app
  .route("/category", Category)
  .route("/comment", ArticleComment)
  .route("/tag", Tag)
  .route("/article", Article)
  .route("/book", Book)
  .route("/news", News)
  .route("/creator", Creator)
  .route("/bookcomment", BookComment);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
