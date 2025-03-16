import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { editors, insertEditorsSchema } from "@/db/schema/article/editor";
import { zValidator } from "@hono/zod-validator";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select({
        id: editors.id,
        name: editors.name,
      })
      .from(editors);
    return c.json({ data });
  })
  .post("/", zValidator("json", insertEditorsSchema), async (c) => {
    const values = c.req.valid("json");

    const data = await db.insert(editors).values({
      ...values,
    });
    return c.json({ data });
  });

export default app;
