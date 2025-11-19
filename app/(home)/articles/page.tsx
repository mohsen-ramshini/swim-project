import ArticlesList from "@/components/articles/ArticlesList";
import HeroSection from "@/components/hero/HeroSection";

const page = () => {
  return (
    <section className="w-full h-full">
      <HeroSection
        imageSourse={"banner-one.jpg"}
        width={1920}
        height={150}
        title="لیست مقالات"
        subtitle="صفحه اصلی | لیست مقالات"
      />
      <div className="max-w-3xl m-auto lg:max-w-full">
        <ArticlesList />
      </div>
    </section>
  );
};

export default page;
