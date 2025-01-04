import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetArticle = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["category", { id }],
    queryFn: async () => {
      const response = await client.api.category[":id"].$get({ param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
