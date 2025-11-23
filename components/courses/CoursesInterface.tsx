"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Profile from "../articles/Profile";
import { handlers } from "@/lib/mock";
import { useCourses as useGetCoursesAPI } from "./hook/use-courses";
import { CourseType } from "@/db/schema/courses/courses";

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

// Media query hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

const CoursesInterface: React.FC = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const isMobile = useMediaQuery("(max-width: 1024px)");
  const visibleCount = isMobile ? 4 : 6;

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        let fetched: CourseType[] = [];

        if (USE_MOCK) {
          const res = await handlers.courses.getCourses();
          fetched = (res.data as CourseType[]) ?? [];
        } else {
          await useGetCoursesAPI(); // API اصلی
        }

        setCourses(fetched);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
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
    <section className="flex flex-col items-center w-full p-4">
      <div className="grid w-full md:max-w-[900px] lg:max-w-none grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Skeleton Loader */}
        {loading &&
          [...Array(visibleCount)].map((_, index) => (
            <div
              key={index}
              className="w-full min-h-[400px] rounded-xl border p-4 shadow-sm bg-white flex flex-col justify-start text-right"
            >
              <Skeleton className="w-full aspect-[16/9] rounded-lg mb-4" />
              <Skeleton className="w-3/4 h-6 mb-3" />
              <Skeleton className="w-1/2 h-5" />
            </div>
          ))}

        {/* Cards */}
        {!loading &&
          courses.slice(0, visibleCount).map((course, index) => (
            <Link key={index} href="https://www.swimacademy.ir/courses">
              <div
                className="
                w-full 
                min-h-[400px] 
                rounded-xl 
                border 
                p-4 
                shadow-sm 
                bg-white 
                flex flex-col 
                justify-between 
                text-right 
                transition-all 
                hover:shadow-lg 
                hover:-translate-y-1
              "
              >
                {/* Thumbnail */}
                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden mb-4 bg-gray-200">
                  <Skeleton className="w-full h-full" />
                </div>

                {/* Title + Profile */}
                <div className="w-full flex flex-row-reverse justify-between items-center border-b pb-3 mb-3">
                  <h4 className="text-lg md:text-xl lg:text-2xl font-semibold leading-tight">
                    {course.title}
                  </h4>

                  <div className="flex-shrink-0 md:max-w-[150px] lg:max-w-[170px]">
                    <Profile
                      fullName={course?.instructor?.title ?? ""}
                      isLoading={!course?.instructor?.title}
                      size="sm"
                    />
                  </div>
                </div>

                {/* Price + Capacity */}
                <div className="w-full flex flex-row-reverse justify-between items-center mt-auto">
                  <div className="flex flex-row-reverse gap-1 items-baseline font-semibold">
                    <span className="text-lg md:text-xl">{course.price}</span>
                    <span className="text-gray-600 text-sm">تومان</span>
                  </div>

                  <div className="flex flex-row-reverse items-center text-sm md:text-base">
                    <span className="font-medium">ظرفیت:</span>
                    <span className="px-1 font-semibold">
                      {course.capacity} نفر
                    </span>
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
