import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetBookByCategory = (categoryId: number) => {
  return useQuery({
    queryKey: ["books", categoryId],
    enabled: typeof categoryId === "number" && categoryId > 0,
    queryFn: async () => {
      if (!categoryId) throw new Error("Category ID is required");

      // Construct the correct URL with categoryId
      const response = await client.api.book.category[":categoryId"].$get({
        param: { categoryId: categoryId.toString() },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.statusText}`);
      }

      const data = await response.json();

      return data;
    },
  });
};
