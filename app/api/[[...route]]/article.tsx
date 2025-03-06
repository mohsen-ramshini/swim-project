import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { articles, insertArticleSchema } from "@/db/schema/article/article";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";
import ArticleCategory from "@/features/articleCategory/components/ArticleCategory";
import { articleCategories } from "@/db/schema/article/articleCategory";

const app = new Hono()
  .get("/", async (c) => {
    console.log("article");

    const data = await db
      .select({
        id: articles.id,
        articleType: articles.articleType,
        title: articles.title,
        slug: articles.slug,
        thumbnail: articles.thumbnail,
        excerpt: articles.excerpt,
        content: articles.content,
        categoryId: articles.categoryId,
        reference: articles.reference,
        publishTime: articles.publishTime,
        modifiedBy: articles.modifiedBy,
        modifiedAt: articles.modifiedAt,
        createdBy: articles.createdBy,
        createdAt: articles.createdAt,
        isActive: articles.isActive,
      })
      .from(articles);
    return c.json({ data });
  })
  .get(
    "/category/:categoryId",
    zValidator(
      "param",
      z.object({
        categoryId: z.string().optional(),
      })
    ),
    async (c) => {
      const { categoryId } = c.req.valid("param");

      if (!categoryId) {
        return c.json({ error: "Missing category ID" }, 400);
      }

      // تبدیل categoryId به عدد
      const numericCategoryId = parseInt(categoryId, 10);
      if (isNaN(numericCategoryId)) {
        return c.json({ error: "Invalid category ID" }, 400);
      }

      // بررسی اینکه آیا این دسته‌بندی وجود دارد
      const categoryExists = await db
        .select()
        .from(articleCategories)
        .where(eq(articleCategories.id, numericCategoryId));

      if (categoryExists.length === 0) {
        return c.json({ error: "Category not found" }, 404);
      }

      // دریافت مقالات مرتبط با این دسته‌بندی
      const data = await db
        .select({
          id: articles.id,
          articleType: articles.articleType,
          title: articles.title,
          slug: articles.slug,
          thumbnail: articles.thumbnail,
          excerpt: articles.excerpt,
          content: articles.content,
          categoryId: articles.categoryId,
          reference: articles.reference,
          publishTime: articles.publishTime,
          modifiedBy: articles.modifiedBy,
          modifiedAt: articles.modifiedAt,
          createdBy: articles.createdBy,
          createdAt: articles.createdAt,
          isActive: articles.isActive,
        })
        .from(articles)
        .where(eq(articles.categoryId, numericCategoryId));

      if (data.length === 0) {
        return c.json({ error: "No articles found for this category" }, 404);
      }

      return c.json({ data });
    }
  )
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
          id: articles.id,
          articleType: articles.articleType,
          title: articles.title,
          slug: articles.slug,
          thumbnail: articles.thumbnail,
          excerpt: articles.excerpt,
          content: articles.content,
          categoryId: articles.categoryId,
          reference: articles.reference,
          publishTime: articles.publishTime,
          modifiedBy: articles.modifiedBy,
          modifiedAt: articles.modifiedAt,
          createdBy: articles.createdBy,
          createdAt: articles.createdAt,
          isActive: articles.isActive,
        })
        .from(articles)
        .where(eq(articles.slug, slug));

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
          id: articles.id,
          articleType: articles.articleType,
          title: articles.title,
          slug: articles.slug,
          thumbnail: articles.thumbnail,
          excerpt: articles.excerpt,
          content: articles.content,
          categoryId: articles.categoryId,
          reference: articles.reference,
          publishTime: articles.publishTime,
          modifiedBy: articles.modifiedBy,
          modifiedAt: articles.modifiedAt,
          createdBy: articles.createdBy,
          createdAt: articles.createdAt,
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
