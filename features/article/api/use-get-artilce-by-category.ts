import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetArticlesByCategory = (categoryId: number) => {
  return useQuery({
    queryKey: ["articles", categoryId],
    enabled: typeof categoryId === "number" && categoryId > 0,
    queryFn: async () => {
      if (!categoryId) throw new Error("Category ID is required");

      // Construct the correct URL with categoryId
      const response = await client.api.article.category[":categoryId"].$get({
        param: { categoryId: categoryId.toString() },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
      }

      const data = await response.json();

      return data;
    },
  });
};
