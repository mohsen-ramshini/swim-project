import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.article)["bulk-delete"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.article)["bulk-delete"]["$post"]
>;

export const useBulkDeleteArticles = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.article["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Article deleted");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: () => {
      toast.error("Failed to delete article");
    },
  });

  return mutation;
};
