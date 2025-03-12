import { useQueries } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetArticlesAndCategories = () => {
  const [articlesQuery, categoriesQuery] = useQueries({
    queries: [
      {
        queryKey: ["articles"],
        queryFn: async () => {
          const response = await client.api.article.$get();
          if (!response.ok) {
            throw new Error("Failed to fetch articles");
          }
          const { data } = await response.json();
          return data;
        },
      },
      {
        queryKey: ["categories"],
        queryFn: async () => {
          const response = await client.api.category.$get();
          if (!response.ok) {
            throw new Error("Failed to fetch categories");
          }
          const { data } = await response.json();
          return data;
        },
      },
    ],
  });

  return { articlesQuery, categoriesQuery };
};
