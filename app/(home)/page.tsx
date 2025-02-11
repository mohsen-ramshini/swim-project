import React from "react";
import Hero from "./components/HeroSection";
import Articles from "./components/articles/Articles";
import Books from "./components/books/Books";

const page = () => {
  return (
    <div className="m-auto w-full h-full flex-col justify-center items-center ">
      <Hero />
      <Articles />
      <Books />
    </div>
  );
};

export default page;
