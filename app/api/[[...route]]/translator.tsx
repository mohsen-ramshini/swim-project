import { Hono } from "hono";
import { db } from "@/db/drizzle";
import {
  translators,
  insertTranslatorSchema,
} from "@/db/schema/article/translator";
import { zValidator } from "@hono/zod-validator";
import { title } from "process";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select({
        id: translators.id,
        name: translators.name,
      })
      .from(translators);
    return c.json({ data });
  })
  .post("/", zValidator("json", insertTranslatorSchema), async (c) => {
    const values = c.req.valid("json");
    const data = await db.insert(translators).values({
      ...values,
    });
    return c.json({ data });
  });

export default app;
