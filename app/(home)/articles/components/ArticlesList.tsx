import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import SingleArticleInterface from "./SingleArticleInterface";
import { ArticlePagination } from "./ArticlePagination";
import { Checkbox } from "@/components/ui/checkbox";

const Artciles = [
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
const ArticlesList = () => {
  return (
    <section className="w-full h-full flex flex-col  ">
      <h1 className="mt-14 mr-16 text-black font-extrabold text-5xl text-right ">
        مقالات
      </h1>
      <div className="w-full h-full flex flex-row-reverse ">
        <div className=" w-3/4 flex flex-col justify-center items-center ">
          <div className="w-3/4">
            {Artciles.map((article) => (
              <SingleArticleInterface key={article.id} data={article} />
            ))}
          </div>
        </div>
        <div className=" w-1/4 flex flex-col justify-start items-center ">
          <aside className="w-full h-56 mt-20">
            <h3 className="text-center font-semibold text-4xl">دسته بندی ها</h3>
            <div className="w-full  p-10 text-right">
              <ul>
                <li>
                  <label htmlFor="news" className="mr-1 text-gray-500 text-xl">
                    اخبار
                  </label>
                  <Checkbox id="news" />
                </li>
                <li>
                  <label htmlFor="news" className="mr-1 text-gray-500 text-xl">
                    آناتومی شنا
                  </label>
                  <Checkbox id="news" />
                </li>
                <li>
                  <label htmlFor="news" className="mr-1 text-gray-500 text-xl">
                    بدنسازی شنا
                  </label>
                  <Checkbox id="news" />
                </li>
              </ul>
            </div>
            <div className="w-full h-full rounded-sm bg-blue-400 text-center text-3xl font-bold">
              <div className="pt-5 text-white">با ما تماس بگیرید</div>
            </div>
          </aside>
        </div>
      </div>
      <div className="bg-white">
        <ArticlePagination />
      </div>
    </section>
  );
};

export default ArticlesList;
