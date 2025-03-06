import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { editors, insertEditorsSchema } from "@/db/schema/article/editor";
import { zValidator } from "@hono/zod-validator";
import { title } from "process";

const app = new Hono()
  .get("/", async (c) => {
    console.log("object");

    const data = await db
      .select({
        id: editors.id,
        name: editors.name,
      })
      .from(editors);
    return c.json({ data });
  })
  .post("/", zValidator("json", insertEditorsSchema), async (c) => {
    console.log("POST route hit");
    const values = c.req.valid("json");
    console.log("Raw Body:", await c.req.json());
    console.log("Validated Data:", values);
    const data = await db.insert(editors).values({
      ...values,
    });
    return c.json({ data });
  });

export default app;
