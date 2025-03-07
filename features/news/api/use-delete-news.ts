import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.news)[":id"]["$delete"]
>;

export const useDeleteNews = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.news[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("News deleted");
      queryClient.invalidateQueries({ queryKey: ["singleNews", { id }] });
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: () => {
      toast.error("Failed to delete news");
    },
  });

  return mutation;
};
