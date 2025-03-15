import ArticlesList from "@/components/articles/ArticlesList";
import HeroSection from "@/components/hero/HeroSection";

const page = () => {
  return (
    <section className="w-full h-full">
      <HeroSection imageSourse={"banner-one.jpg"} width={1920} height={680} />
      <div className="max-w-3xl m-auto lg:max-w-full">
        <ArticlesList />
      </div>
    </section>
  );
};

export default page;
