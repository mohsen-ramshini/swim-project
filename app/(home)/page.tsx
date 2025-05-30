import React from "react";
import Hero from "../../components/hero/HeroSection";
import Articles from "@/components/articles/Articles";
import Books from "@/components/books/Books";
import Courses from "../../components/courses/Courses";
import News from "../../components/news/News";
import NavBar from "../../components/navbar/Navbar";


const HeroSectionContent =
  "اینجا گردهمایی متخصصان، مریان و علاقه مندان به ورزش شنا ست که با هدف گسترش دانش و انتقال تجربه در این حوزه شکل گرفته. ما با تکیه بر روحیه کار تیمی و همدلی، تلاش میکنیم زمینه ای برای ارتقا علمی و عملی ورزشی شنا فراهم کنیم همه علاقه مندان، فارغ از هر محدودیتی، میتوانند برای ساخت آینده ای درخشان تر در ورزش شنا در کنار ما باشند";
const page = () => {
  return (
    <div className="m-auto w-full h-full flex-col justify-center items-center">
      <Articles />
      <Books />
      <Courses />
      <News />
    </div>
  );
};

export default page;
