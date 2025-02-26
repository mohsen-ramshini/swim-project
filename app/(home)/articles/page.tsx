import ArticlesList from "@/components/articles/ArticlesList";
import HeroSection from "@/components/hero/HeroSection";

const page = () => {
  return (
    <section className="w-full h-full">
      <HeroSection
        imageSourse={"banner-one.jpg"}
        width={20480}
        height={500}
        dialog={"سلام"}
      />
      <ArticlesList />
    </section>
  );
};

export default page;
