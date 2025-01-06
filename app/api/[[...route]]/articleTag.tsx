import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { articleTags, insertArticleTagSchema } from "@/db/schema/articleTag";
import { zValidator } from "@hono/zod-validator";
import { and, eq, inArray } from "drizzle-orm";

import { z } from "zod";

const app = new Hono()
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
          id: articleTags.id,
          title: articleTags.title,
          slug: articleTags.slug,
          isActive: articleTags.isActive,
        })
        .from(articleTags)
        .where(and(eq(articleTags.id, numericId)));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .get("/", async (c) => {
    console.log("object");

    const data = await db
      .select({
        id: articleTags.id,
        title: articleTags.title,
        slug: articleTags.slug,
        isActive: articleTags.isActive,
      })
      .from(articleTags);
    return c.json({ data });
  })
  .post("/", zValidator("json", insertArticleTagSchema), async (c) => {
    console.log("POST route hit");
    const values = c.req.valid("json");
    console.log("Raw Body:", await c.req.json());
    console.log("Validated Data:", values);
    const data = await db.insert(articleTags).values({
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
          .delete(articleTags)
          .where(inArray(articleTags.id, numericIds))
          .returning({
            id: articleTags.id,
          });

        return c.json({ success: true, deleted: data });
      } catch (error) {
        console.error("Bulk delete error:", error);
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
      insertArticleTagSchema.pick({
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
        .update(articleTags)
        .set(values)
        .where(eq(articleTags.id, numericId))
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
        .delete(articleTags)
        .where(eq(articleTags.id, numericId))
        .returning({
          id: articleTags.id,
        });

      if (!data) {
        return c.json({ error: "No record found to delete" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
