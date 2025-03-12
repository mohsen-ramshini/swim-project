"use client";
import React from "react";
import { useCourses } from "./hook/use-courses";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
import CoursesInterface from "./CoursesInterface";
import { useRouter } from "next/navigation";

const CourseList: React.FC = () => {
  const router = useRouter();

  return (
    <section className="w-full h-full flex flex-col min-h-screen justify-center items-center ">
      <div className="w-full flex flex-col justify-center px-2">
        <h2 className="text-center font-extrabold text-3xl lg:text-5xl mb-5">
          دوره ها
        </h2>
        <div className="w-full flex justify-center">
          <Button
            variant={"ghost"}
            onClick={() => router.push("https://www.swimacademy.ir/courses")}
          >
            {/* TODO : replace all courses link in swimacademy */}
            <ArrowLeftCircle />
            دیدن همه
          </Button>
        </div>
      </div>
      <div className=" w-4/5">
        <CoursesInterface />
      </div>
    </section>
  );
};

export default CourseList;
