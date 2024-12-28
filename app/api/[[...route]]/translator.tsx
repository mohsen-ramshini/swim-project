import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { translators, insertTranslatorSchema } from "@/db/schema/translator";
import { zValidator } from "@hono/zod-validator";
import { title } from "process";

const app = new Hono()
  .get("/", async (c) => {
    console.log("object");

    const data = await db
      .select({
        id: translators.id,
        name: translators.name,
      })
      .from(translators);
    return c.json({ data });
  })
  .post("/", zValidator("json", insertTranslatorSchema), async (c) => {
    console.log("POST route hit");
    const values = c.req.valid("json");
    console.log("Raw Body:", await c.req.json());
    console.log("Validated Data:", values);
    const data = await db.insert(translators).values({
      ...values,
    });
    return c.json({ data });
  });

export default app;
