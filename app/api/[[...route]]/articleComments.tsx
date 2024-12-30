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

    // Log raw body
    const rawBody = await c.req.json();
    console.log("Raw Body:", rawBody);

    try {
      // Validate request
      const values = c.req.valid("json");
      console.log("Validated Data:", values);

      // Insert into database
      const data = await db.insert(articleComments).values({ ...values });
      return c.json({ data });
    } catch (error) {
      console.error("Error during validation or insertion:", error);
      return c.json(
        { error: "Validation failed or database error", details: error },
        400
      );
    }
  });

export default app;
