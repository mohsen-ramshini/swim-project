import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.comment.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.comment.$post>;

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      try {
        const response = await client.api.comment.$post({ json });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error during comment creation:", error);
        throw new Error("Failed to create comment");
      }
    },

    onSuccess: () => {
      toast.success("comment created");
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: () => {
      toast.error("Failed to create comment");
    },
  });

  return mutation;
};
