import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.book)[":id"]["$patch"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.book)[":id"]["$patch"]
>;

export const useEditBook = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.book[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("book updated");
      queryClient.invalidateQueries({ queryKey: ["book", { id }] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: () => {
      toast.error("Failed to update article");
    },
  });

  return mutation;
};
