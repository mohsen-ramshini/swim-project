import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.article)[":id"]["$patch"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.article)[":id"]["$patch"]
>;

export const useEditArticle = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.article[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Article updated");
      queryClient.invalidateQueries({ queryKey: ["article", { id }] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: () => {
      toast.error("Failed to update article");
    },
  });

  return mutation;
};
