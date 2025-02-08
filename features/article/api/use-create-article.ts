import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.article.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.article.$post>;

export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.article.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Article created");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: () => {
      toast.error("Failed to create article");
    },
  });

  return mutation;
};
