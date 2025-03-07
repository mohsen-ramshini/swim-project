import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.news)["bulk-delete"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.news)["bulk-delete"]["$post"]
>;

export const useBulkDeleteNews = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.news["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("news deleted");
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: () => {
      toast.error("Failed to delete news");
    },
  });

  return mutation;
};
