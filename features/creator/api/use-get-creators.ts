import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCreators = () => {
  const query = useQuery({
    queryKey: ["creators"],
    queryFn: async () => {
      const response = await client.api.creator.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
