import { Hono } from "hono";
import { db } from "@/db/drizzle";
import {
  bookComments,
  insertBookCommentsSchema,
} from "@/db/schema/book/bookComment";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select({
        id: bookComments.id,
        createDate: bookComments.createDate,
        text: bookComments.text,
        bookId: bookComments.bookId,
      })
      .from(bookComments);
    return c.json({ data });
  })
  .get("/:bookId", async (c) => {
    const bookId = Number(c.req.param("bookId")); // تبدیل به عدد

    if (isNaN(bookId)) {
      return c.json({ error: "Invalid bookId" }, 400);
    }

    const data = await db
      .select({
        id: bookComments.id,
        createDate: bookComments.createDate,
        text: bookComments.text,
        bookId: bookComments.bookId,
        userId: bookComments.userId,
      })
      .from(bookComments)
      .where(eq(bookComments.bookId, bookId)); // استفاده از eq

    return c.json({ data });
  })
  .post("/", zValidator("json", insertBookCommentsSchema), async (c) => {
    const rawBody = await c.req.json();

    try {
      const values = c.req.valid("json");

      const data = await db.insert(bookComments).values({ ...values });
      return c.json({ data });
    } catch (error) {
      return c.json(
        { error: "Validation failed or database error", details: error },
        400
      );
    }
  });

export default app;
