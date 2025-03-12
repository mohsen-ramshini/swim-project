import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.creator)[":id"]["$delete"]
>;

export const useDeleteCreator = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.creator[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("creator deleted");
      queryClient.invalidateQueries({ queryKey: ["creator", { id }] });
      queryClient.invalidateQueries({ queryKey: ["creators"] });
    },
    onError: () => {
      toast.error("Failed to delete article");
    },
  });

  return mutation;
};
