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
    <section className="w-full h-full flex flex-col">
      <div className="flex flex-row-reverse justify-between my-5 px-2">
        <h2 className="font-extrabold text-3xl lg:text-5xl">دوره ها</h2>
        <Button
          variant={"ghost"}
          onClick={() => router.push("https://www.swimacademy.ir/courses")}
        >
          {/* TODO : replace all courses link in swimacademy */}
          <ArrowLeftCircle />
          دیدن همه
        </Button>
      </div>
      <div>
        <CoursesInterface />
      </div>
    </section>
  );
};

export default CourseList;
