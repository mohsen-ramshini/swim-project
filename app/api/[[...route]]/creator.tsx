import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { creators } from "@/db/schema/article/creator";
import { authors } from "@/db/schema/article/author";
import { editors } from "@/db/schema/article/editor";
import { translators } from "@/db/schema/article/translator";
import { creatorAuthor } from "@/db/schema/article/creatorAuthor";
import { creatorEditor } from "@/db/schema/article/creatorEditor";
import { creatorTranslator } from "@/db/schema/article/creatorTranslator";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, and, inArray } from "drizzle-orm";

const app = new Hono()

  .get("/", async (c) => {
    const data = await db
      .select({
        id: creators.id,
        name: creators.name,
      })
      .from(creators);
    return c.json({ data });
  })

  // 2. دریافت یک پدیدآورنده خاص همراه با نقش‌هایش
  .get("/:id", async (c) => {
    const { id } = c.req.param();
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return c.json({ error: "Invalid ID" }, 400);

    // دریافت اطلاعات پدیدآورنده
    const [creator] = await db
      .select({
        id: creators.id,
        name: creators.name,
      })
      .from(creators)
      .where(eq(creators.id, numericId));

    if (!creator) return c.json({ error: "Not found" }, 404);

    // دریافت نقش‌های پدیدآورنده
    const authorsList = await db
      .select({ author_id: creatorAuthor.author_id })
      .from(creatorAuthor)
      .where(eq(creatorAuthor.creator_id, numericId));

    const editorsList = await db
      .select({ editor_id: creatorEditor.editor_id })
      .from(creatorEditor)
      .where(eq(creatorEditor.creator_id, numericId));

    const translatorsList = await db
      .select({ translator_id: creatorTranslator.translator_id })
      .from(creatorTranslator)
      .where(eq(creatorTranslator.creator_id, numericId));

    return c.json({
      id: creator.id,
      name: creator.name,
      roles: {
        authors: authorsList.map((a) => a.author_id),
        editors: editorsList.map((e) => e.editor_id),
        translators: translatorsList.map((t) => t.translator_id),
      },
    });
  })

  // 3. ایجاد پدیدآورنده همراه با نقش‌هایش
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        name: z.string(),
        roles: z.array(
          z.object({
            type: z.enum(["author", "editor", "translator"]),
            role_id: z.number(),
          })
        ),
      })
    ),
    async (c) => {
      const values = c.req.valid("json");

      // ثبت پدیدآورنده
      const [creator] = await db
        .insert(creators)
        .values({
          name: values.name,
        })
        .returning({ id: creators.id });

      // افزودن نقش‌ها
      for (const role of values.roles) {
        if (role.type === "author") {
          await db.insert(creatorAuthor).values({
            creator_id: creator.id,
            author_id: role.role_id,
          });
        } else if (role.type === "editor") {
          await db.insert(creatorEditor).values({
            creator_id: creator.id,
            editor_id: role.role_id,
          });
        } else if (role.type === "translator") {
          await db.insert(creatorTranslator).values({
            creator_id: creator.id,
            translator_id: role.role_id,
          });
        }
      }

      return c.json({ success: true, creator });
    }
  )
  .post(
    "/bulk-delete",
    zValidator(
      "json",
      z.object({
        ids: z.array(z.number()), // آرایه‌ای از ID‌ها برای حذف
      })
    ),
    async (c) => {
      const { ids } = c.req.valid("json");

      if (!ids || ids.length === 0) {
        return c.json({ error: "No ids provided" }, 400);
      }

      // حذف گروهی از پدیدآورندگان
      const result = await db
        .delete(creators)
        .where(inArray(creators.id, ids)) // حذف بر اساس آرایه‌ای از آی‌دی‌ها
        .returning({ id: creators.id });

      if (result.length === 0) {
        return c.json({ error: "No creators found to delete" }, 404);
      }

      // حذف نقش‌های مرتبط با پدیدآورندگان حذف‌شده
      await db
        .delete(creatorAuthor)
        .where(inArray(creatorAuthor.creator_id, ids));
      await db
        .delete(creatorEditor)
        .where(inArray(creatorEditor.creator_id, ids));
      await db
        .delete(creatorTranslator)
        .where(inArray(creatorTranslator.creator_id, ids));

      return c.json({ success: true, deletedCount: result.length });
    }
  )

  // 4. حذف پدیدآورنده
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
        .delete(creators)
        .where(eq(creators.id, numericId))
        .returning({ id: creators.id });

      if (!data) {
        return c.json({ error: "No record found to delete" }, 404);
      }

      return c.json({ data });
    }
  )

  // 5. ویرایش پدیدآورنده
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
      z.object({
        name: z.string(),
        roles: z.array(
          z.object({
            type: z.enum(["author", "editor", "translator"]),
            role_id: z.number(),
          })
        ),
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

      // ویرایش اطلاعات پدیدآورنده
      const [updatedCreator] = await db
        .update(creators)
        .set({ name: values.name })
        .where(eq(creators.id, numericId))
        .returning({ id: creators.id, name: creators.name });

      if (!updatedCreator) {
        return c.json({ error: "No record found to update" }, 404);
      }

      // حذف نقش‌های قبلی
      await db
        .delete(creatorAuthor)
        .where(eq(creatorAuthor.creator_id, numericId));
      await db
        .delete(creatorEditor)
        .where(eq(creatorEditor.creator_id, numericId));
      await db
        .delete(creatorTranslator)
        .where(eq(creatorTranslator.creator_id, numericId));

      // افزودن نقش‌های جدید
      for (const role of values.roles) {
        if (role.type === "author") {
          await db.insert(creatorAuthor).values({
            creator_id: numericId,
            author_id: role.role_id,
          });
        } else if (role.type === "editor") {
          await db.insert(creatorEditor).values({
            creator_id: numericId,
            editor_id: role.role_id,
          });
        } else if (role.type === "translator") {
          await db.insert(creatorTranslator).values({
            creator_id: numericId,
            translator_id: role.role_id,
          });
        }
      }

      return c.json({ success: true, updatedCreator });
    }
  );

export default app;
