// // import { Hono } from "hono";
// // import { db } from "@/db/drizzle";

// // import { zValidator } from "@hono/zod-validator";
// // import { articleCategories } from "@/db/schema/articleCategory";

// // const app = new Hono().get("/", async (c) => {
// //   const data = await db
// //     .select({
// //       id: articleCategories.id,
// //       title: articleCategories.title,
// //     })
// //     .from(articleCategories);
// //   return c.json({ data });
// // });

// // export default app;

// import { Hono } from "hono";
// import { db } from "@/db/drizzle"; // Ensure this imports your Drizzle DB connection
// import { articleCategories } from "@/db/schema/articleCategory"; // Ensure this matches your schema

// const articleCat = new Hono();

// articleCat.get("/", async (c) => {
//   try {
//     const categories = await db
//       .select({ id: articleCategories.id, title: articleCategories.title })
//       .from(articleCategories);
//     return c.json({ categories });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return c.json({ error: "Failed to fetch categories" }, 500);
//   }
// });

// articleCat.post("/", async (c) => {
//   try {
//     const body = await c.req.json();
//     const newCategory = await db.insert(articleCategories).values(body);
//     return c.json(newCategory);
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return c.json({ error: "Failed to create category" }, 500);
//   }
// });

// export default articleCat;
import { Hono } from "hono";
import { db } from "@/db/drizzle";
import {
  articleCategories,
  insertArticleCategoriesSchema,
} from "@/db/schema/articleCategory";
import { zValidator } from "@hono/zod-validator";

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
  .post("/", zValidator("json", insertArticleCategoriesSchema), async (c) => {
    console.log("POST route hit");
    const values = c.req.valid("json");
    console.log("Raw Body:", await c.req.json());
    console.log("Validated Data:", values);
    const data = await db.insert(articleCategories).values({
      ...values,
    });
    return c.json({ data });
  });

export default app;
