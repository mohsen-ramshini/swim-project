import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { articles, insertArticleSchema } from "@/db/schema/article";
import { zValidator } from "@hono/zod-validator";
import { title } from "process";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";

const app = new Hono()
  .get("/", async (c) => {
    console.log("object");

    const data = await db
      .select({
        id: articles.id,
        title: articles.title,
        slug: articles.slug,
        isActive: articles.isActive,
      })
      .from(articles);
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
          id: articles,
          title: articles.title,
          slug: articles.slug,
          isActive: articles.isActive,
        })
        .from(articles)
        .where(and(eq(articles.id, numericId)));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post("/", zValidator("json", insertArticleSchema), async (c) => {
    console.log("POST route hit");
    const values = c.req.valid("json");
    console.log("Raw Body:", await c.req.json());
    console.log("Validated Data:", values);
    const data = await db.insert(articles).values({
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
          .delete(articles)
          .where(inArray(articles.id, numericIds))
          .returning({
            id: articles.id,
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
      insertArticleSchema.pick({
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
        .update(articles)
        .set(values)
        .where(eq(articles.id, numericId))
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
        .delete(articles)
        .where(eq(articles.id, numericId))
        .returning({
          id: articles.id,
        });

      if (!data) {
        return c.json({ error: "No record found to delete" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
