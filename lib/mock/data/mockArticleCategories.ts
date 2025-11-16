import { articleCategories } from "@/db/schema/article/articleCategory";
import type { InferInsertModel } from "drizzle-orm";

export const mockArticleCategories: InferInsertModel<typeof articleCategories>[] = [
  {
    id: 1,
    title: "آموزش شنا برای مبتدی‌ها",
    slug: "swimming-for-beginners",
    isActive: true,
  },
  {
    id: 2,
    title: "آموزش شنای کرال سینه",
    slug: "freestyle-techniques",
    isActive: true,
  },
  {
    id: 3,
    title: "شنای کرال پشت",
    slug: "backstroke-training",
    isActive: true,
  },
  {
    id: 4,
    title: "شنای قورباغه",
    slug: "breaststroke-guide",
    isActive: true,
  },
  {
    id: 5,
    title: "شنای پروانه",
    slug: "butterfly-techniques",
    isActive: true,
  },
  {
    id: 6,
    title: "تمرینات افزایش استقامت",
    slug: "endurance-workouts",
    isActive: true,
  },
  {
    id: 7,
    title: "تمرینات مهارت تنفس",
    slug: "breathing-skills",
    isActive: true,
  },
  {
    id: 8,
    title: "تجهیزات شنا",
    slug: "swimming-equipment",
    isActive: true,
  },
  {
    id: 9,
    title: "نکات ایمنی شنا",
    slug: "swimming-safety",
    isActive: true,
  },
  {
    id: 10,
    title: "آمادگی جسمانی شناگران",
    slug: "swimmers-fitness",
    isActive: true,
  },
];
