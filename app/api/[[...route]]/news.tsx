import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { news, insertNewsSchema } from "@/db/schema/news/news";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select({
        id: news.id,
        title: news.title,
        slug: news.slug,
        author: news.author,
        date: news.date,
        content: news.content,
        banner: news.banner,
        publishDate: news.publishDate,
        modifiedBy: news.modifiedBy,
        modifiedAt: news.modifiedAt,
        createdBy: news.createdBy,
        createdAt: news.createdAt,
        isActive: news.isActive,
      })
      .from(news);
    return c.json({ data });
  })
  .get(
    "/slug/:slug",
    zValidator(
      "param",
      z.object({
        slug: z.string(),
      })
    ),
    async (c) => {
      const { slug } = c.req.valid("param");

      const [data] = await db
        .select({
          id: news.id,
          title: news.title,
          slug: news.slug,
          author: news.author,
          date: news.date,
          content: news.content,
          banner: news.banner,
          publishDate: news.publishDate,
          modifiedBy: news.modifiedBy,
          modifiedAt: news.modifiedAt,
          createdBy: news.createdBy,
          createdAt: news.createdAt,
          isActive: news.isActive,
        })
        .from(news)
        .where(eq(news.slug, slug));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
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
          id: news.id,
          title: news.title,
          slug: news.slug,
          author: news.author,
          date: news.date,
          content: news.content,
          banner: news.banner,
          publishDate: news.publishDate,
          modifiedBy: news.modifiedBy,
          modifiedAt: news.modifiedAt,
          createdBy: news.createdBy,
          createdAt: news.createdAt,
          isActive: news.isActive,
        })
        .from(news)
        .where(and(eq(news.id, numericId)));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post("/", zValidator("json", insertNewsSchema), async (c) => {
    const values = c.req.valid("json");

    const data = await db.insert(news).values({
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
          .delete(news)
          .where(inArray(news.id, numericIds))
          .returning({
            id: news.id,
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
      insertNewsSchema.pick({
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
        .update(news)
        .set(values)
        .where(eq(news.id, numericId))
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
        .delete(news)
        .where(eq(news.id, numericId))
        .returning({
          id: news.id,
        });

      if (!data) {
        return c.json({ error: "No record found to delete" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
