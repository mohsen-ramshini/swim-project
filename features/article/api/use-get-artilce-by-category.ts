import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetArticlesByCategory = (categoryId: number) => {
  return useQuery({
    enabled: !!categoryId,
    queryKey: ["articles", { categoryId }],
    queryFn: async () => {
      if (!categoryId) throw new Error("Category ID is required");

      const response = await client.api.article.$get(categoryId.toString());

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();
      return data;
    },
  });
};
