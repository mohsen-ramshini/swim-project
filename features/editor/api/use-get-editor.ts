import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetArticles = () => {
  const query = useQuery({
    queryKey: ["editor"],
    queryFn: async () => {
      const response = await client.api.editor.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();
      return data;
    },
  });
};
