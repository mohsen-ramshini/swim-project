"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Profile from "../articles/Profile";

import { handlers } from "@/lib/mock";
import { useCourses as useGetCoursesAPI } from "./hook/use-courses";
import { CourseType } from "@/db/schema/courses/courses"; // در صورتی که تایپ داری
// یا اگر نداری: type CourseType = any

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

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
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [visibleCount, setVisibleCount] = useState(6);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (isMobile) setVisibleCount(4);
    else setVisibleCount(6);
  }, [isMobile]);

  // 🔥 فچ هماهنگ‌شده با Mock / API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);

        let fetched: CourseType[] = [];

        if (USE_MOCK) {
          const res = await handlers.courses.getCourses();
          fetched = (res.data as CourseType[]) ?? [];
        } else {
          const res = await useGetCoursesAPI();
          // fetched = res.data ?? [];
        }

        setCourses(fetched);
      } catch (err: any) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (error)
    return (
      <div className="text-red-500 text-center my-10">
        خطا در دریافت دوره‌ها: {error.message}
      </div>
    );

  return (
    <section className="flex flex-col justify-center items-center w-full h-full p-4">
      <div className="grid grid-cols-1 w-full max-w-[350px] md:max-w-[800px] lg:max-w-none md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {isLoading &&
          [...Array(visibleCount)].map((_, i) => (
            <div key={i} className="w-full h-full p-2 lg:min-h-96 my-10">
              <Skeleton className="w-full aspect-[16/9]" />
              <Skeleton className="w-1/2 h-6 mt-3" />
              <Skeleton className="w-1/3 h-4 mt-2" />
            </div>
          ))}

        {!isLoading &&
          courses?.slice(0, visibleCount).map((course, idx) => (
            <Link key={idx} href={`https://www.swimacademy.ir/courses`}>
              <div className="w-full h-full p-2 lg:min-h-96 my-10 ">
                <div className="w-full aspect-[16/9]">
                  <Skeleton className="w-full h-full" />
                </div>

                <div className="w-full h-2/6 flex flex-row-reverse justify-between border-b-2 mt-2">
                  <div className="w-1/2 text-right">
                    <h4 className="text-xl lg:text-2xl font-semibold">
                      {course.title}
                    </h4>
                  </div>
                  <div className="flex-shrink-0 max-w-full md:max-w-[120px]">
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
                    <p className="inline-block px-1">نفر {course.capacity}</p>
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
