import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.category)["bulk-delete"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.category)["bulk-delete"]["$post"]
>;

export const useBulkDeleteCategories = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.category["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Article Categories deleted");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: () => {
      toast.error("Failed to delete article category");
    },
  });

  return mutation;
};
