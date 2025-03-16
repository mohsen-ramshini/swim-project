import { Hono } from "hono";
import { db } from "@/db/drizzle";
import {
  articleComments,
  insertArticleCommentsSchema,
} from "@/db/schema/article/articleComments";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select({
        id: articleComments.id,
        createDate: articleComments.createDate,
        text: articleComments.text,
        articleId: articleComments.articleId,
      })
      .from(articleComments);
    return c.json({ data });
  })
  .get("/:articleId", async (c) => {
    const articleId = Number(c.req.param("articleId")); // تبدیل به عدد

    if (isNaN(articleId)) {
      return c.json({ error: "Invalid articleId" }, 400);
    }

    const data = await db
      .select({
        id: articleComments.id,
        createDate: articleComments.createDate,
        text: articleComments.text,
        articleId: articleComments.articleId,
        userId: articleComments.userId,
      })
      .from(articleComments)
      .where(eq(articleComments.articleId, articleId)); // استفاده از eq

    return c.json({ data });
  })
  .post("/", zValidator("json", insertArticleCommentsSchema), async (c) => {
    const rawBody = await c.req.json();

    try {
      const values = c.req.valid("json");

      const data = await db.insert(articleComments).values({ ...values });
      return c.json({ data });
    } catch (error) {
      return c.json(
        { error: "Validation failed or database error", details: error },
        400
      );
    }
  });

export default app;
