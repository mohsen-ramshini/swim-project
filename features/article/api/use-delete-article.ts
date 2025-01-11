import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.article)[":id"]["$delete"]
>;

export const useDeleteArticle = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.article[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Article deleted");
      queryClient.invalidateQueries({ queryKey: ["article", { id }] });
      queryClient.invalidateQueries({ queryKey: ["artilces"] });
    },
    onError: () => {
      toast.error("Failed to delete article");
    },
  });

  return mutation;
};
