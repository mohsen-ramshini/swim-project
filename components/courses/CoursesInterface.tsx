import React, { useEffect, useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useCourses } from "./hook/use-courses";
import Profile from "../articles/Profile";

const CoursesInterface = () => {
  const { data: courses = [], isLoading, error } = useCourses();
  const [visibleCount, setVisibleCount] = useState(6);

  const showMoreBooks = () => {
    setVisibleCount((prev) => prev + 6);
  };
  const showLessBooks = () => {
    setVisibleCount((prev) => (prev = 6));
  };

  return (
    <section className="flex flex-col justify-center items-center w-full h-full">
      <div className="grid grid-cols-1 w-[350px] h-full md:w-[800px] md:grid-cols-2 lg:w-full lg:grid-cols-3 lg:h-full gap-4 mb-10">
        {courses?.slice(0, visibleCount).map((course, idx) => (
          <Link href={`https://www.swimacademy.ir/courses/${course.slug}`}>
            <div key={idx} className="w-full h-full p-2 lg:min-h-96  ">
              <div className="w-full h-3/6">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="w-full h-2/6 flex flex-row-reverse justify-between border-b-2 mt-2">
                <div className=" w-1/2 text-right">
                  <h4 className="text-xl lg:text-3xl font-semibold">
                    {course.title}
                  </h4>
                </div>
                <div>
                  <Profile />
                </div>
              </div>
              <div className="w-full h-1/6  flex flex-row-reverse justify-between items-center">
                <div className="flex flex-row-reverse gap-1 items-baseline">
                  <span>{course.price}</span>
                  تومان
                </div>
                <div className="flex flex-row-reverse">
                  <span> :ظرفیت</span>
                  <p className="inline-block px-1">
                    {course.remaining_capacity}
                  </p>
                  از
                  <p className="inline-block px-1">{course.capacity}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="w-1/5 text-center mb-5">
        {visibleCount < courses.length ? (
          <Button
            onClick={showMoreBooks}
            variant={"ghost"}
            className="w-full px-12"
          >
            مشاهده بیشتر
          </Button>
        ) : (
          <Button
            onClick={showLessBooks}
            variant={"ghost"}
            className="w-full px-12"
          >
            مشاهده کمتر
          </Button>
        )}
      </div>
    </section>
  );
};

export default CoursesInterface;
