import React, { useEffect, useState } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useCourses } from "./hook/use-courses";
import Profile from "../articles/Profile";

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const CoursesInterface = () => {
  const { data: courses = [], isLoading, error } = useCourses();
  const [visibleCount, setVisibleCount] = useState(6);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (isMobile) {
      setVisibleCount(4);
    } else setVisibleCount(6);
  }, [isMobile]);

  return (
    <section className="flex flex-col justify-center items-center w-full h-full p-4">
      <div className="grid grid-cols-1 w-full max-w-[350px] md:max-w-[800px] lg:max-w-none md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {courses?.slice(0, visibleCount).map((course, idx) => (
          <Link
            key={idx}
            href={`https://www.swimacademy.ir/courses/${course.slug}`}
          >
            <div className="w-full h-full p-2 lg:min-h-96 my-10 ">
              <div className="w-full aspect-[16/9]">
                <Skeleton className="w-full h-full" />
              </div>
              <div className="w-full h-2/6 flex flex-row-reverse justify-between border-b-2 mt-2">
                <div className="w-1/2 text-right ">
                  <h4 className="text-xl lg:text-2xl font-semibold">
                    {course.title}
                  </h4>
                </div>
                <div className="flex-shrink-0 max-w-full md:max-w-[120px] ">
                  <Profile fullName="محسن رامشینی" size="sm" />
                </div>
              </div>
              <div className="w-full h-1/6 flex flex-row-reverse justify-between items-center">
                <div className="flex flex-row-reverse gap-1 items-baseline">
                  <span>{course.price}</span>
                  تومان
                </div>
                <div className="flex flex-row-reverse">
                  <span> :ظرفیت</span>

                  <p className="inline-block px-1">نفر {course.capacity} </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CoursesInterface;
