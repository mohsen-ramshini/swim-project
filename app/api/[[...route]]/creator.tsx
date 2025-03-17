import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { creators } from "@/db/schema/article/creator";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, inArray } from "drizzle-orm";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db.select().from(creators);
    return c.json({ data });
  })
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return c.json({ error: "Invalid ID" }, 400);

    const [creator] = await db
      .select()
      .from(creators)
      .where(eq(creators.id, numericId));

    if (!creator) return c.json({ error: "Not found" }, 404);

    return c.json({ creator });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        translator: z.boolean().optional(),
        editor: z.boolean().optional(),
        author: z.boolean().optional(),
      })
    ),
    async (c) => {
      const values = c.req.valid("json");
      const [creator] = await db.insert(creators).values(values).returning();
      return c.json({ success: true, creator });
    }
  )
  .post(
    "/bulk-delete",
    zValidator("json", z.object({ ids: z.array(z.number()) })),
    async (c) => {
      const { ids } = c.req.valid("json");
      if (!ids.length) return c.json({ error: "No ids provided" }, 400);

      const result = await db
        .delete(creators)
        .where(inArray(creators.id, ids))
        .returning();
      if (!result.length)
        return c.json({ error: "No creators found to delete" }, 404);

      return c.json({ success: true, deletedCount: result.length });
    }
  )
  .delete("/:id", async (c) => {
    const { id } = c.req.param();
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return c.json({ error: "Invalid ID" }, 400);

    const [deleted] = await db
      .delete(creators)
      .where(eq(creators.id, numericId))
      .returning();
    if (!deleted) return c.json({ error: "No record found to delete" }, 404);

    return c.json({ success: true, deleted });
  })
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator(
      "json",
      z.object({
        name: z.string(),
        translator: z.boolean().optional(),
        editor: z.boolean().optional(),
        author: z.boolean().optional(),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");
      if (!id) return c.json({ error: "Missing id parameter" }, 400);

      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) return c.json({ error: "Invalid id format" }, 400);

      const [updatedCreator] = await db
        .update(creators)
        .set(values)
        .where(eq(creators.id, numericId))
        .returning();

      if (!updatedCreator)
        return c.json({ error: "No record found to update" }, 404);

      return c.json({ success: true, updatedCreator });
    }
  );

export default app;
