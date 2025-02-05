import { notFound } from "next/navigation";
import SingleArticleInterface from "../components/SingleArticleInterface";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  params: { articleId: string };
}

const Articles = [
  {
    id: 1,
    articleType: 1,
    title: "مزیای شنا برای سلامتی",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا یک ورزش کم‌فشار است که تأثیر زیادی بر سلامت قلب و عروق، افزایش ظرفیت تنفسی و تقویت عضلات دارد. این ورزش به کاهش استرس، بهبود انعطاف‌پذیری و افزایش استقامت بدنی کمک می‌کند. همچنین برای افراد مبتلا به مشکلات مفصلی یا کمردرد، گزینه‌ای ایده‌آل است",
    categoryId: 1,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 2,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 3,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 4,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 5,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
  {
    id: 6,
    articleType: 1,
    title: "شنا برای مبتدیان",
    slug: "http://helloworld.com",
    thumbnail:
      "https://www.swimacademy.ir/_next/image?url=https%3A%2F%2Fbend.swimacademy.ir%2Fmedia%2Fuploads%2Fimages%2Fproducts%2Fvrpxwwbwtrjq0sw6ubxp.jpg&w=1920&q=75",
    excerpt: "test",
    content:
      "شنا دارای چهار سبک اصلی است: کرال سینه، کرال پشت، قورباغه، و پروانه. هر یک از این سبک‌ها تکنیک‌های خاصی دارند که برای بهبود سرعت و کارایی نیاز به تمرین مداوم دارند. یادگیری درست حرکات دست، پا و تنفس از مهم‌ترین اصول در بهبود مهارت‌های شنا است.",
    categoryId: 2,
    reference: "1",
    publishTime: new Date(),
    isActive: true,
    createdBy: 12,
    createdAt: new Date(),
    modifiedBy: 12,
    modifiedAt: new Date(),
  },
];

interface Props {
  params: { articleId: string };
}
// TODO : remove this module and export it
const getCategoryContentById = (cat: number) => {
  switch (cat) {
    case 1:
      return "بدنسازی شنا";
    case 2:
      return "آناتومی شنا";
    case 3:
      return "تغذیه";
    default:
      return "بدون دسته بندی";
  }
};

export default async function ArticlePage({ params }: Props) {
  const articleId = Number(await params.articleId); // Ensure it's awaited
  if (isNaN(articleId)) return notFound();
  const article = Articles.find((post) => post.id === articleId);
  if (!article) return notFound();

  const Category = getCategoryContentById(article.categoryId);

  return (
    <section className="w-full h-screen bg-slate-600 ">
      <div className="w-full h-full pt-20 text-center m-auto bg-slate-300 flex flex-col items-center justify-center">
        <div className="w-2/3 h-1/4 bg-red-600">
          <span className="text-gray-400 font-medium text-2xl">date</span>
          <h1 className="font-extrabold text-5xl">{article.title}</h1>
          <div>{Category}</div>
          <div className="w-1/3 h-full m-auto">
            <Skeleton className="w-full h-full" />
          </div>
        </div>
        <div className="w-2/3 h-2/4 bg-green-700">
          <div className="text-right">{article.excerpt}</div>
          <div className="text-right">{article.content}</div>
        </div>
        <div className="w-2/3 h-1/4 bg-orange-600">
          <h3></h3>
          <div>{/* <SingleArticleInterface/> */}</div>
        </div>
      </div>
    </section>
  );
}
