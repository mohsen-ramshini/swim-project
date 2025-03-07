import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.news)[":id"]["$patch"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.news)[":id"]["$patch"]
>;

export const useEditNews = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.news[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("news updated");
      queryClient.invalidateQueries({ queryKey: ["singleNews", { id }] });
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: () => {
      toast.error("Failed to update news");
    },
  });

  return mutation;
};
