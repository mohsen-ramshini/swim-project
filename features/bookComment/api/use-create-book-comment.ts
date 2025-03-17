import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  typeof client.api.bookcomment.$post
>["json"];
type ResponseType = InferResponseType<typeof client.api.bookcomment.$post>;

export const useCreateBookComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      try {
        const response = await client.api.bookcomment.$post({ json });
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error during comment creation:", error);
        throw new Error("Failed to create comment");
      }
    },

    onSuccess: () => {
      toast.success("comment created");
      queryClient.invalidateQueries({ queryKey: ["bookComment"] });
    },
    onError: () => {
      toast.error("Failed to create comment");
    },
  });

  return mutation;
};
