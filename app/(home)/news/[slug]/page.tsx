import { notFound } from "next/navigation";
import NewsSingleInterface from "@/app/(home)/components/news/NewsSingleInterface";
import { Skeleton } from "@/components/ui/skeleton";
import Profile from "../../components/articles/Profile";

const Articles = [
  {
    id: 1,
    articleType: 1,
    title: "مزیای شنا برای سلامتی",
    slug: "swimming-advanteage",
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
    slug: "swimming-for-begginers",
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
    slug: "swimming-for-begginers",
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
    slug: "swimming-for-begginers",
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
    slug: "swimming-for-begginers",
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
    slug: "swimming-for-begginers",
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
  params: { slug: string };
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
  const { slug } = await params;

  const article = Articles.find((post) => post.slug === slug);
  if (!article) return notFound();

  const articleId = Number(article.id);
  if (isNaN(articleId)) return notFound();

  const relatedArticles = Articles.filter(
    (item) => item.categoryId === article.categoryId && item.id !== articleId
  );

  const Category = getCategoryContentById(article.categoryId);

  return (
    <section className="w-full">
      <div className="w-full pt-20 text-center m-auto flex flex-col items-center">
        <div className="w-3/4 lg:w-2/3">
          <div className="flex flex-col justify-center items-center mb-14">
            <span className="text-gray-400 font-medium text-xl lg:text-2xl">
              date
            </span>
            <h1 className="font-extrabold text-3xl lg:text-5xl ">
              {article.title}
            </h1>
            <div className="w-24 h-12 lg:w-36 lg:h-16 flex justify-center items-center rounded-md bg-slate-300 opacity-80 my-5 font-semibold text-md lg:text-xl">
              {Category}
            </div>
            <div className="w-full h-[200px] lg:w-[550px] lg:h-[250px] m-auto">
              <Skeleton className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <Profile />
          <div className="text-right font-bold text-2xl lg:text-3xl my-5">
            {article.excerpt}
          </div>
          <div className="text-right font-semibold text-md lg:text-lg">
            {article.content}
          </div>
        </div>
        <div className="w-2/3">
          <h3 className="text-xl font-semibold my-20">مقالات مرتبط</h3>
          <div className="mb-20">
            {relatedArticles.map((related) => (
              <NewsSingleInterface data={related} key={related.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
