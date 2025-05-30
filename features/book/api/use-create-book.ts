import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.book.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.book.$post>;

export const useCreateBook = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      // Add required fields
      const enrichedJson = {
        ...json,
        createdBy: 1, // Replace with actual user ID
        // createdAt: new Date(),
        modifiedBy: null, // Optional
        // modifiedAt: new Date(),
      };

      const response = await client.api.book.$post({ json: enrichedJson });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("book created");
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to create book");
    },
  });

  return mutation;
};
