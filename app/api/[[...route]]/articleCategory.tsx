import { Hono } from "hono";
import { db } from "@/db/drizzle";
import {
  articleCategories,
  insertArticleCategoriesSchema,
} from "@/db/schema/articleCategory";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";
import { error } from "console";

const app = new Hono()
  .get("/", async (c) => {
    console.log("object");

    const data = await db
      .select({
        id: articleCategories.id,
        title: articleCategories.title,
      })
      .from(articleCategories);
    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      // Convert the id to a number
      const numericId = parseInt(id, 10);

      if (isNaN(numericId)) {
        return c.json({ error: "Invalid id" }, 400);
      }

      const [data] = await db
        .select({
          id: articleCategories.id,
          title: articleCategories.title,
        })
        .from(articleCategories)
        .where(and(eq(articleCategories.id, numericId)));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )

  .post("/", zValidator("json", insertArticleCategoriesSchema), async (c) => {
    console.log("POST route hit");
    const values = c.req.valid("json");
    console.log("Raw Body:", await c.req.json());
    console.log("Validated Data:", values);
    const data = await db.insert(articleCategories).values({
      ...values,
    });
    return c.json({ data });
  })
  .post(
    "/bulk-delete",
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      try {
        const values = c.req.valid("json");
        const numericIds = values.ids.map((id) => parseInt(id, 10));

        const data = await db
          .delete(articleCategories)
          .where(inArray(articleCategories.id, numericIds))
          .returning({
            id: articleCategories.id,
          });

        return c.json({ success: true, deleted: data });
      } catch (error) {
        console.error("Bulk delete error:", error);
        return c.json({ success: false, error: "Failed to delete items" }, 500);
      }
    }
  );

export default app;
