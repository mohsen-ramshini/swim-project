import React from "react";
import HeadArticle from "./HeadArticle";
import ArticleInterface from "./ArticleInterface";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft, ArrowLeftCircle } from "lucide-react";

const Articles = () => {
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

  const headArticles = Artciles.slice(0, 1);
  const middleArticle = Artciles.slice(1, 2);
  const otherArticles = Artciles.slice(2);

  return (
    <section className=" flex flex-col justify-center items-center w-full h-[1010px] min-h-screen p-4 mb-10">
      <h2 className="relative right-10 lg:text-center text-black text-5xl my-4 font-extrabold">
        آخرین مقالات
      </h2>
      <div className="w-full ">
        <Button variant={"ghost"}>
          {" "}
          <ArrowLeftCircle /> مشاهده همه
        </Button>
      </div>
      <div className="flex flex-col xl:flex-row justify-center items-center w-full gap-4 h-full bg-white">
        {/* سایر مقالات */}
        <div className=" w-full xl:w-1/2 text-center h-full p-4">
          {otherArticles.map((art) => (
            <ArticleInterface data={art} key={art.id} />
          ))}
        </div>
        {/* بخش اصلی */}
        <div className=" w-full xl:w-1/2 text-center h-full flex flex-col p-4 ">
          <div>
            {headArticles.map((art) => (
              <HeadArticle key={art.id} data={art} />
            ))}
          </div>
          <div>
            {middleArticle.map((art) => (
              <ArticleInterface key={art.id} data={art} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
