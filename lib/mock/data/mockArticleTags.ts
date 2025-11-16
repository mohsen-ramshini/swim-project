import { articleTags } from "@/db/schema/article/articleTag";
import type { InferInsertModel } from "drizzle-orm";

export const mockArticleTags: InferInsertModel<typeof articleTags>[] = [
  {
    id: 1,
    title: "آموزش شنا",
    slug: "swimming-tutorial",
    isActive: true,
  },
  {
    id: 2,
    title: "تنفس در شنا",
    slug: "swimming-breathing",
    isActive: true,
  },
  {
    id: 3,
    title: "تمرینات شنا",
    slug: "swimming-workouts",
    isActive: true,
  },
  {
    id: 4,
    title: "کرال سینه",
    slug: "freestyle",
    isActive: true,
  },
  {
    id: 5,
    title: "کرال پشت",
    slug: "backstroke",
    isActive: true,
  },
  {
    id: 6,
    title: "قورباغه",
    slug: "breaststroke",
    isActive: true,
  },
  {
    id: 7,
    title: "پروانه",
    slug: "butterfly",
    isActive: true,
  },
  {
    id: 8,
    title: "تجهیزات شنا",
    slug: "swim-equipment",
    isActive: true,
  },
  {
    id: 9,
    title: "ایمنی در شنا",
    slug: "swim-safety",
    isActive: true,
  },
  {
    id: 10,
    title: "افزایش سرعت شنا",
    slug: "swim-speed",
    isActive: true,
  },
];
