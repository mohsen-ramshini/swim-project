import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetArticles = () => {
  const query = useQuery({
    queryKey: ["author"],
    queryFn: async () => {
      const response = await client.api.author.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();
      return data;
    },
  });
};
