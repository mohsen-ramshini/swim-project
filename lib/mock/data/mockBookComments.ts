import { InferInsertModel } from "drizzle-orm";
import { bookComments as bookCommentsTable } from "@/db/schema/book/bookComment";

export const mockBookComments: InferInsertModel<typeof bookCommentsTable>[] = [
  {
    id: 1,
    bookId: 1,
    parentId: null,
    userId: 5,
    createDate: new Date("2024-09-12T10:45:00Z"),
    text: "این کتاب برای شروع شنا فوق‌العاده بود. توضیحات مرحله‌به‌مرحله واقعاً کمکم کرد.",
  },
  {
    id: 2,
    bookId: 1,
    parentId: 1,
    userId: 9,
    createDate: new Date("2024-09-13T08:20:00Z"),
    text: "کاملاً موافقم، مخصوصاً بخش آموزش تنفس خیلی خوب توضیح داده شده.",
  },

  {
    id: 3,
    bookId: 2,
    parentId: null,
    userId: 3,
    createDate: new Date("2024-10-01T14:00:00Z"),
    text: "اگر کرال سینه رو بلدین و می‌خواین سرعتتون بره بالا، این کتاب عالیه.",
  },

  {
    id: 4,
    bookId: 2,
    parentId: 3,
    userId: 7,
    createDate: new Date("2024-10-02T09:30:00Z"),
    text: "از تمرینات استقامتی آخر کتاب خیلی خوشم اومد، خیلی موثر بودن.",
  },

  {
    id: 5,
    bookId: 3,
    parentId: null,
    userId: 2,
    createDate: new Date("2024-08-21T18:10:00Z"),
    text: "اطلاعات خوبی درباره تمرینات خشکی داره، ولی کاش ویدئو هم داشت.",
  },
];
