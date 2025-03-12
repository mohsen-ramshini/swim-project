import { useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetArticles = () => {
  const queryClient = useQueryClient(); // گرفتن کوئری کلاینت

  return useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const response = await client.api.article.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();

      // **بعد از دریافت مقالات، کش دسته‌بندی‌ها را نامعتبر کنیم**
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      return data;
    },
  });
};
