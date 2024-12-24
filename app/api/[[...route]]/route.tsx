import { Hono } from "hono";
import { handle } from "hono/vercel";
import article from "./articleCategory";
import { HTTPException } from "hono/http-exception";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ error: "Internal server error", err }, 500);
});

const routes = app.route("/articles", article);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
