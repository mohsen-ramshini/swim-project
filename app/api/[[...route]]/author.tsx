import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { authors, insertAuthorSchema } from "@/db/schema/article/author";
import { zValidator } from "@hono/zod-validator";
import { title } from "process";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select({
        id: authors.id,
        name: authors.name,
      })
      .from(authors);
    return c.json({ data });
  })
  .post("/", zValidator("json", insertAuthorSchema), async (c) => {
    const values = c.req.valid("json");

    const data = await db.insert(authors).values({
      ...values,
    });
    return c.json({ data });
  });

export default app;
