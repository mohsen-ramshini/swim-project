import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetTag = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["tag", { id }],
    queryFn: async () => {
      const response = await client.api.tag[":id"].$get({ param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch tags");
      }

      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
