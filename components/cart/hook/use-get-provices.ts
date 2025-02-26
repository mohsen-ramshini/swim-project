import { useQuery } from "@tanstack/react-query";

const fetchStates = async () => {
  const response = await fetch("/api/states");
  if (!response.ok) {
    throw new Error("خطا در دریافت اطلاعات استان‌ها");
  }
  const data = await response.json();
  return data;
};

export const useStates = () => {
  return useQuery({
    queryKey: ["states"],
    queryFn: fetchStates,
  });
};
