import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetBook = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["book", { id }],
    queryFn: async () => {
      const response = await client.api.book[":id"].$get({ param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch book");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
