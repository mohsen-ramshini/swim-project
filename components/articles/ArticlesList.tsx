import React from "react";
import ArticlePagination from "./ArticlePagination";

const ArticlesList = () => {
  return (
    <section className="w-full h-full flex flex-col my-10">
      <h1 className="mt-14 mr-16 text-black font-extrabold text-5xl text-right ">
        مقالات
      </h1>
      {/* <div className="w-full h-full flex flex-row-reverse ">
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
      </div> */}
      <div className="bg-white">
        <ArticlePagination />
      </div>
    </section>
  );
};

export default ArticlesList;
