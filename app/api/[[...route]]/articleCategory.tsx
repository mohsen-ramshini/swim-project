import { Hono } from "hono";
import { db } from "@/db/drizzle";
import {
  articleCategories,
  insertArticleCategoriesSchema,
} from "@/db/schema/article/articleCategory";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select({
        id: articleCategories.id,
        title: articleCategories.title,
        slug: articleCategories.slug,
        isActive: articleCategories.isActive,
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
          slug: articleCategories.slug,
          isActive: articleCategories.isActive,
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
    const values = c.req.valid("json");

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
        return c.json({ success: false, error: "Failed to delete items" }, 500);
      }
    }
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      insertArticleCategoriesSchema.pick({
        title: true,
        slug: true,
        isActive: true,
      })
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id parameter" }, 400);
      }

      const numericId = parseInt(id, 10);

      if (isNaN(numericId)) {
        return c.json({ error: "Invalid id format" }, 400);
      }

      const [data] = await db
        .update(articleCategories)
        .set(values)
        .where(eq(articleCategories.id, numericId))
        .returning();

      if (!data) {
        return c.json({ error: "No record found to update" }, 404);
      }

      return c.json({ data });
    }
  )
  .delete(
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
        return c.json({ error: "Missing id parameter" }, 400);
      }

      const numericId = parseInt(id, 10);

      if (isNaN(numericId)) {
        return c.json({ error: "Invalid id format" }, 400);
      }

      const [data] = await db
        .delete(articleCategories)
        .where(eq(articleCategories.id, numericId))
        .returning({
          id: articleCategories.id,
        });

      if (!data) {
        return c.json({ error: "No record found to delete" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
