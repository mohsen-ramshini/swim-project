import { Hono } from "hono";
import { handle } from "hono/vercel";
import Article from "./article";
import Category from "./articleCategory";
import Comment from "./articleComments";
import Tag from "./articleTag";
import Author from "./author";
import Editor from "./editor";
import Translator from "./translator";
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
  .route("/comment", Comment)
  .route("/tag", Tag)
  .route("/author", Author)
  .route("/editor", Editor)
  .route("/translator", Translator)
  .route("/article", Article);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
