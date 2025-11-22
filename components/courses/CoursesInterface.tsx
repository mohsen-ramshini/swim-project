"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Profile from "../articles/Profile";

import { handlers } from "@/lib/mock";
import { useCourses as useGetCoursesAPI } from "./hook/use-courses";
import { CourseType } from "@/db/schema/courses/courses";

const USE_MOCK = process.env.NEXT_PUBLIC_DEMO === "true";

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

interface Props {
  isLoading?: boolean; // prop جدید
}

const CoursesInterface: React.FC<Props> = ({ isLoading: propLoading }) => {
  const [courses, setCourses] = useState<CourseType[]>([]);
  const [internalLoading, setInternalLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const [visibleCount, setVisibleCount] = useState(6);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    if (isMobile) setVisibleCount(4);
    else setVisibleCount(6);
  }, [isMobile]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setInternalLoading(true);

        let fetched: CourseType[] = [];

        if (USE_MOCK) {
          const res = await handlers.courses.getCourses();
          fetched = (res.data as CourseType[]) ?? [];
        } else {
          const res = await useGetCoursesAPI();
        }

        setCourses(fetched);
      } catch (err: any) {
        setError(err);
      } finally {
        setInternalLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const loading = propLoading ?? internalLoading;

  if (error)
    return (
      <div className="text-red-500 text-center my-10">
        خطا در دریافت دوره‌ها: {error.message}
      </div>
    );

  return (
    <section className="flex flex-col justify-center items-end w-full h-full p-4">
      <div className="grid grid-cols-1 w-full max-w-[350px] md:max-w-[800px] lg:max-w-none md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {loading &&
          [...Array(visibleCount)].map((_, i) => (
            <div
              key={i}
              className="w-full h-full p-2 lg:min-h-96 my-10 flex flex-col items-end text-right"
            >
              <Skeleton className="w-full aspect-[16/9] rounded-md mb-4" />
              <Skeleton className="w-3/4 h-6 rounded mb-2" />
              <Skeleton className="w-1/2 h-4 rounded" />
            </div>
          ))}

        {!loading &&
          courses?.slice(0, visibleCount).map((course, idx) => (
            <Link key={idx} href={`https://www.swimacademy.ir/courses`}>
              <div className="w-full h-full p-2 lg:min-h-96 my-10 flex flex-col items-end text-right">
                <div className="w-full aspect-[16/9] rounded-md overflow-hidden mb-4">
                  <Skeleton className="w-full h-full" />
                </div>

                <div className="w-full flex flex-row-reverse justify-between border-b-2 mb-2">
                  <div className="text-right">
                    <h4 className="text-xl lg:text-2xl font-semibold">
                      {course.title}
                    </h4>
                  </div>
                  <div className="flex-shrink-0 max-w-full md:max-w-[120px]">
                    <Profile fullName="محسن رامشینی" size="sm" />
                  </div>
                </div>

                <div className="w-full flex flex-row-reverse justify-between items-center text-right">
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
