import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.creator)[":id"]["$patch"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.creator)[":id"]["$patch"]
>;

export const useEditCreator = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.creator[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("creator updated");
      queryClient.invalidateQueries({ queryKey: ["creator", { id }] });
      queryClient.invalidateQueries({ queryKey: ["creators"] });
    },
    onError: () => {
      toast.error("Failed to update article");
    },
  });

  return mutation;
};
