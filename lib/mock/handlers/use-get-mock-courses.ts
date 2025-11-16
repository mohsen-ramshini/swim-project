import { mockQuery } from "./mockQuery";
import { mockCourses } from "../data/mockCourses";

/* ------------------------- Courses ------------------------- */

export const getCourses = async () => {
  return mockQuery(() => mockCourses, 1200);
};

export const getCourseById = async (id: number) => {
  return mockQuery(() => {
    const course = mockCourses.find((c) => c.id === id);

    if (!course) {
      throw new Error("Course not found");
    }

    return course;
  }, 1500);
};

/* ---------------- Course Filters & Queries ---------------- */

// export const getCoursesByCategory = async (slug: string) => {
//   return mockQuery(() => {
//     return mockCourses.filter((c) => c.category.slug === slug);
//   }, 1000);
// };

// export const getCoursesByInstructor = async (instructorSlug: string) => {
//   return mockQuery(() => {
//     return mockCourses.filter((c) => c.instructor.slug === instructorSlug);
//   }, 1100);
// };

export const getCoursesWithReplay = async () => {
  return mockQuery(() => {
    return mockCourses.filter((c) => c.has_replay === true);
  }, 900);
};

export const getElectedCourses = async () => {
  return mockQuery(() => {
    return mockCourses.filter((c) => c.is_elected === true);
  }, 950);
};

/* -------- Remaining capacity & registration-related -------- */

export const getAvailableCourses = async () => {
  return mockQuery(() => {
    return mockCourses.filter((c) => c.remaining_capacity > 0);
  }, 1000);
};

export const getFullCourses = async () => {
  return mockQuery(() => {
    return mockCourses.filter((c) => c.remaining_capacity === 0);
  }, 1000);
};
