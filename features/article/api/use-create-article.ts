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
      // Add required fields
      const enrichedJson = {
        ...json,
        createdBy: 1, // Replace with actual user ID
        // createdAt: new Date(),
        modifiedBy: null, // Optional
        // modifiedAt: new Date(),
      };

      console.log("Final request body:", JSON.stringify(enrichedJson));

      const response = await client.api.article.$post({ json: enrichedJson });

      if (!response.ok) {
        console.log(response);
        const errorText = await response.text();
        console.error("Error Response:", errorText);
        throw new Error(`Request failed with status ${response.status}`);
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Article created");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to create article");
    },
  });

  return mutation;
};
