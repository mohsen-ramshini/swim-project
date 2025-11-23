import { InferInsertModel } from "drizzle-orm";
import { news as newsTable } from "@/db/schema/news/news";

export const mockNews: InferInsertModel<typeof newsTable>[] = [
  {
    id: 1,
    title: "افتتاح بزرگ‌ترین استخر آموزش شنا در تهران",
    author: "تحریریه شنارِسا",
    date: new Date("2024-09-10T08:00:00Z"),
    slug: "largest-swimming-pool-opened-tehran",
    content:
      "بزرگ‌ترین مرکز آموزش شنا در تهران با امکانات حرفه‌ای و استانداردهای بین‌المللی افتتاح شد. این مجموعه دارای استخرهای مخصوص کودکان، بزرگسالان و ورزش‌های تخصصی آب است.",
    banner: "/static/images/banner-four.jpg",
    publishDate: new Date("2024-09-10T08:00:00Z"),
    isActive: true,
    createdBy: 1,
    createdAt: new Date("2024-09-10T08:00:00Z"),
    modifiedBy: null,
    modifiedAt: new Date("2024-09-10T08:00:00Z"),
  },

  {
    id: 2,
    title: "موفقیت شناگران ایرانی در مسابقات قهرمانی آسیا",
    author: "محمد حسینی",
    date: new Date("2024-08-22T11:30:00Z"),
    slug: "iran-swimmers-asia-championship",
    content:
      "تیم ملی شنای ایران در مسابقات قهرمانی آسیا توانست چندین مدال رنگارنگ کسب کند. مربیان تیم این موفقیت را نتیجه تمرینات منظم و برنامه‌ریزی هدفمند دانستند.",
    banner: "/static/images/banner-four.jpg",
    publishDate: new Date("2024-08-22T11:30:00Z"),
    isActive: true,
    createdBy: 1,
    createdAt: new Date("2024-08-22T11:30:00Z"),
    modifiedBy: null,
    modifiedAt: new Date("2024-08-22T11:30:00Z"),
  },

  {
    id: 3,
    title: "۵ تکنیک اصولی برای جلوگیری از خستگی در شنا",
    author: "لیلا رفیعی",
    date: new Date("2024-07-01T14:10:00Z"),
    slug: "5-techniques-avoid-swimming-fatigue",
    content:
      "شناگران تازه‌کار معمولاً با مشکل خستگی سریع مواجه می‌شوند. در این مقاله ۵ تکنیک اصولی برای مدیریت انرژی و پیشگیری از خستگی معرفی شده است.",
    banner: "/static/images/banner-four.jpg",
    publishDate: new Date("2024-07-01T14:10:00Z"),
    isActive: true,
    createdBy: 1,
    createdAt: new Date("2024-07-01T14:10:00Z"),
    modifiedBy: null,
    modifiedAt: new Date("2024-07-01T14:10:00Z"),
  },

  {
    id: 4,
    title: "آغاز ثبت‌نام کلاس‌های آموزش شنا تابستان ۱۴۰۳",
    author: "تحریریه شنارِسا",
    date: new Date("2024-06-15T09:00:00Z"),
    slug: "swimming-classes-summer-1403",
    content:
      "ثبت‌نام دوره‌های آموزش شنا ویژه تابستان ۱۴۰۳ در سراسر کشور آغاز شد. این دوره‌ها شامل آموزش برای کودکان، نوجوانان و بزرگسالان است.",
    banner: "/static/images/banner-four.jpg",
    publishDate: new Date("2024-06-15T09:00:00Z"),
    isActive: true,
    createdBy: 1,
    createdAt: new Date("2024-06-15T09:00:00Z"),
    modifiedBy: null,
    modifiedAt: new Date("2024-06-15T09:00:00Z"),
  },

  {
    id: 5,
    title: "فواید شنا برای سلامت قلب در تحقیقات جدید",
    author: "نسترن محسنی",
    date: new Date("2024-05-04T12:40:00Z"),
    slug: "/images/static/article_one.jpg",
    content:
      "طبق تحقیقات جدید دانشگاه آکسفورد، شنا یکی از موثرترین ورزش‌ها برای سلامت قلب شناخته شده است. این مطالعه نشان می‌دهد شنا می‌تواند ریسک بیماری‌های قلبی را تا ۳۵٪ کاهش دهد.",
    banner: "/static/images/banner-four.jpg",
    publishDate: new Date("2024-05-04T12:40:00Z"),
    isActive: true,
    createdBy: 1,
    createdAt: new Date("2024-05-04T12:40:00Z"),
    modifiedBy: null,
    modifiedAt: new Date("2024-05-04T12:40:00Z"),
  },
];
