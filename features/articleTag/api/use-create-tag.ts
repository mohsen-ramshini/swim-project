import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.tag.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.tag.$post>;

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tag.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Article Tag created");
      queryClient.invalidateQueries({ queryKey: ["tag"] });
    },
    onError: () => {
      toast.error("Failed to create article tag");
    },
  });

  return mutation;
};
