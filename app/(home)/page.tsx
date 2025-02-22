import React from "react";
import Hero from "./components/hero/HeroSection";
import Articles from "./components/articles/Articles";
import Books from "./components/books/Books";
import Courses from "./components/courses/Courses";
import News from "./components/news/News";

const page = () => {
  return (
    <div className="m-auto w-full h-full flex-col justify-center items-center ">
      <Hero />
      <p>test </p>
      <Articles />
      <Books />
      <Courses />
      <News />
    </div>
  );
};

export default page;
