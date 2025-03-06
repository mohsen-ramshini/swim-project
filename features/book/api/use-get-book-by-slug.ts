import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetBookBySlug = (slug?: string) => {
  return useQuery({
    enabled: !!slug,
    queryKey: ["book", { slug }],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");

      const response = await client.api.book.slug[":slug"].$get({
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch book");
      }

      const { data } = await response.json();
      return data;
    },
  });
};
