import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { articleTags, insertArticleTagSchema } from "@/db/schema/articleTag";
import { zValidator } from "@hono/zod-validator";
import { title } from "process";

const app = new Hono()
  .get("/", async (c) => {
    console.log("object");

    const data = await db
      .select({
        id: articleTags.id,
        title: articleTags.title,
        slug: articleTags.slug,
        isActive: articleTags.isActive,
      })
      .from(articleTags);
    return c.json({ data });
  })
  .post("/", zValidator("json", insertArticleTagSchema), async (c) => {
    console.log("POST route hit");
    const values = c.req.valid("json");
    console.log("Raw Body:", await c.req.json());
    console.log("Validated Data:", values);
    const data = await db.insert(articleTags).values({
      ...values,
    });
    return c.json({ data });
  });

export default app;
