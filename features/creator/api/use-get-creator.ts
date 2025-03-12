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

      // تایپ داده‌های بازگشتی به گونه‌ای که id به عنوان string باشد
      const creator = await response.json();
      return {
        id: creator.id.toString(),
        name: creator.name,
        roles: creator.roles,
      };
    },
  });

  return query;
};
