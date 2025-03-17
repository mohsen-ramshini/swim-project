import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetBookComment = (bookId?: string) => {
  const query = useQuery({
    enabled: !!bookId,
    queryKey: ["bookComment", bookId],
    queryFn: async () => {
      if (!bookId) throw new Error("bookId is required");

      const response = await client.api.bookcomment[":bookId"].$get({
        param: { bookId },
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
