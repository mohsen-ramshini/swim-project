import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.tag)[":id"]["$patch"]
>["json"];
type ResponseType = InferResponseType<(typeof client.api.tag)[":id"]["$patch"]>;

export const useEditTag = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tag[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Article Tag updated");
      queryClient.invalidateQueries({ queryKey: ["tag", { id }] });
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: () => {
      toast.error("Failed to update article Tag");
    },
  });

  return mutation;
};
