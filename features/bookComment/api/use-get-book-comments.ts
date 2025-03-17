import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetBookComments = () => {
  const query = useQuery({
    queryKey: ["bookComments"],
    queryFn: async () => {
      const response = await client.api.bookcomment.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
