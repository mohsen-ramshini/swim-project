import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetNewsBySlug = (slug?: string) => {
  return useQuery({
    enabled: !!slug,
    queryKey: ["singleNews", { slug }],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");

      const response = await client.api.news.slug[":slug"].$get({
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const { data } = await response.json();
      return data;
    },
  });
};
