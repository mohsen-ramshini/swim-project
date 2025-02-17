import React from "react";
import NewsPagination from "../components/news/NewsPagination";

const page = () => {
  return (
    <section className="w-full h-full flex flex-col my-10">
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
