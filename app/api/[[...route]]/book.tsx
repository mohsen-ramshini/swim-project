import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { books, insertBookSchema } from "@/db/schema/book/book";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";
import ArticleCategory from "@/features/articleCategory/components/ArticleCategory";
import { articleCategories } from "@/db/schema/article/articleCategory";

const app = new Hono()
  .get("/", async (c) => {
    const data = await db
      .select({
        id: books.id,
        title: books.title,
        slug: books.slug,
        thumbnail: books.thumbnail,
        description: books.description,
        publishTime: books.publishTime,
        bookComments: books.bookComments,
        price: books.price,
        ISBN: books.ISBN,
        editionNo: books.editionNo,
        state: books.state,
        pageCount: books.pageCount,
        modifiedBy: books.modifiedBy,
        modifiedAt: books.modifiedAt,
        createdBy: books.createdBy,
        createdAt: books.createdAt,
        isActive: books.isActive,
      })
      .from(books);
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
          id: books.id,
          title: books.title,
          slug: books.slug,
          thumbnail: books.thumbnail,
          description: books.description,
          publishTime: books.publishTime,
          bookComments: books.bookComments,
          price: books.price,
          ISBN: books.ISBN,
          editionNo: books.editionNo,
          state: books.state,
          pageCount: books.pageCount,
          modifiedBy: books.modifiedBy,
          modifiedAt: books.modifiedAt,
          createdBy: books.createdBy,
          createdAt: books.createdAt,
          isActive: books.isActive,
        })
        .from(books)
        .where(eq(books.slug, slug));

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
          id: books.id,
          title: books.title,
          slug: books.slug,
          thumbnail: books.thumbnail,
          description: books.description,
          publishTime: books.publishTime,
          bookComments: books.bookComments,
          price: books.price,
          ISBN: books.ISBN,
          editionNo: books.editionNo,
          state: books.state,
          pageCount: books.pageCount,
          modifiedBy: books.modifiedBy,
          modifiedAt: books.modifiedAt,
          createdBy: books.createdBy,
          createdAt: books.createdAt,
          isActive: books.isActive,
        })
        .from(books)
        .where(and(eq(books.id, numericId)));

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post("/", zValidator("json", insertBookSchema), async (c) => {
    console.log("POST route hit");
    const values = c.req.valid("json");
    console.log("Raw Body:", await c.req.json());
    console.log("Validated Data:", values);
    const data = await db.insert(books).values({
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
          .delete(books)
          .where(inArray(books.id, numericIds))
          .returning({
            id: books.id,
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
      insertBookSchema.pick({
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
        .update(books)
        .set(values)
        .where(eq(books.id, numericId))
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
        .delete(books)
        .where(eq(books.id, numericId))
        .returning({
          id: books.id,
        });

      if (!data) {
        return c.json({ error: "No record found to delete" }, 404);
      }

      return c.json({ data });
    }
  );

export default app;
