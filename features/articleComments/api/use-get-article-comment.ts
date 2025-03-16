import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetArticleComment = (articleId?: string) => {
  const query = useQuery({
    enabled: !!articleId,
    queryKey: ["comment", articleId],
    queryFn: async () => {
      if (!articleId) throw new Error("articleId is required");

      const response = await client.api.comment[":articleId"].$get({
        param: { articleId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comment");
      }

      const jsonData = await response.json();

      return jsonData.data;
    },
  });

  return query;
};
