import { creators } from "@/db/schema/article/creator";
import type { InferInsertModel } from "drizzle-orm";

export const mockCreators: InferInsertModel<typeof creators>[] = [
  {
    id: 1,
    name: "مهدی رستمی",
    author: true,
    editor: false,
    translator: false,
  },
  {
    id: 2,
    name: "سارا کاظمی",
    author: false,
    editor: true,
    translator: false,
  },
  {
    id: 3,
    name: "علیرضا شریفی",
    author: true,
    editor: true,
    translator: false,
  },
  {
    id: 4,
    name: "نازنین پوراحمد",
    author: false,
    editor: false,
    translator: true,
  },
  {
    id: 5,
    name: "پارسا نادری",
    author: true,
    editor: false,
    translator: false,
  },
  {
    id: 6,
    name: "مریم محمدی",
    author: false,
    editor: true,
    translator: true,
  },
  {
    id: 7,
    name: "کیان امیری",
    author: true,
    editor: true,
    translator: false,
  },
  {
    id: 8,
    name: "الهام مرادی",
    author: false,
    editor: true,
    translator: false,
  },
  {
    id: 9,
    name: "شایان مرزوقی",
    author: true,
    editor: false,
    translator: true,
  },
  {
    id: 10,
    name: "رها حسینی",
    author: false,
    editor: false,
    translator: true,
  },
];
