import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetArticleComments = () => {
  const query = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      const response = await client.api.comment.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
