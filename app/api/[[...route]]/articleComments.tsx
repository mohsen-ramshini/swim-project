import { Hono } from "hono";
import { db } from "@/db/drizzle";
import {
  articleComments,
  insertArticleCommentsSchema,
} from "@/db/schema/articleComments";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", async (c) => {
    console.log("object");

    const data = await db
      .select({
        id: articleComments.id,
        createDate: articleComments.createDate,
      })
      .from(articleComments);
    return c.json({ data });
  })
  .post("/", zValidator("json", insertArticleCommentsSchema), async (c) => {
    console.log("POST route hit");
    const values = c.req.valid("json");
    console.log("Raw Body:", await c.req.json());
    console.log("Validated Data:", values);
    const data = await db.insert(articleComments).values({
      ...values,
    });
    return c.json({ data });
  });

export default app;
