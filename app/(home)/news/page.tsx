import React from "react";
import NewsPagination from "../../../components/news/NewsPagination";
import HeroSection from "@/components/hero/HeroSection";

const page = () => {
  return (
    <section className="w-full h-full flex flex-col">
      <HeroSection
        imageSourse={"banner-four.jpg"}
        width={1920}
        height={680}
        dialog={"سلام"}
      />
      <h1 className="mt-14 mr-16 text-black font-extrabold text-5xl text-right ">
        اخبار
      </h1>
      <div className="bg-white mt-5">
        <NewsPagination />
      </div>
    </section>
  );
};

export default page;
