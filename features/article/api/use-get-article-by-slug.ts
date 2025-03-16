import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetArticleBySlug = (slug?: string) => {
  return useQuery({
    enabled: !!slug,
    queryKey: ["article", { slug }],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required");

      const response = await client.api.article.slug[":slug"].$get({
        param: { slug },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch article");
      }

      const { data } = await response.json();

      return data;
    },
  });
};
