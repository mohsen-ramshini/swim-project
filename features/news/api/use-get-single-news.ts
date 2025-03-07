import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetSingleNews = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["singleNews", { id }],
    queryFn: async () => {
      const response = await client.api.news[":id"].$get({ param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
