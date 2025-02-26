import { useQuery } from "@tanstack/react-query";

interface Course {
  slug: string;
  title: string;
  organizer: {
    slug: string;
    title: string;
    order: number;
  };
  category: {
    slug: string;
    title: string;
  };
  price: number;
  instructor: {
    slug: string;
    title: string;
    image_url: string;
  };
  image_url: string;
  banner_url: string | null;
  duration: number;
  session_counts: number;
  start_date: string;
  capacity: number;
  remaining_capacity: number;
  offers: string;
  is_elected: boolean;
  election_order: number;
  has_replay: boolean;
}

const fetchCourses = async (): Promise<Course[]> => {
  const response = await fetch("https://bend.swimacademy.ir/api/lms/courses/");

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();

  return data;
};

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });
};
