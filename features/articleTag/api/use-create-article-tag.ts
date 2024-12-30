import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.tag.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.tag.$post>;

export const useCreateAccount = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      // try {
      const response = await client.api.tag.$post({ json });
      return await response.json();

      //   const data = await response.json();
      //   if (!Array.isArray(data)) {
      //     throw new Error("Expected response data to be an array");
      //   }

      //   const result = data.reduce((acc, item) => {
      //     return acc;
      //   }, []);
      //   return result;
      // } catch (error) {
      //   console.error("Error in mutation:", error);
      //   throw error;
      // }
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
