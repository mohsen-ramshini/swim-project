import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

// تایپ کردن id به عنوان string
export const useGetCreator = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["creator", { id }],
    queryFn: async () => {
      if (!id) {
        throw new Error("Creator ID is required");
      }

      const response = await client.api.creator[":id"].$get({ param: { id } });

      if (!response.ok) {
        throw new Error("Failed to fetch creator");
      }

      const creatorData = await response.json();
      const creator = creatorData.creator;

      return {
        id: creator.id.toString(),
        name: creator.name,
        roles: {
          translator: creator.translator,
          editor: creator.editor,
          author: creator.author,
        },
      };
    },
  });

  return query;
};
