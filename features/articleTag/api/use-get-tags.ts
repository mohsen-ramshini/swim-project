import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTags = () => {
  const query = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await client.api.tag.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
