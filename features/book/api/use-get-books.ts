import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetBooks = () => {
  const query = useQuery({
    queryKey: ["Books"],
    queryFn: async () => {
      const response = await client.api.book.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
