import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { client } from "@/lib/hono";

type RequestType = InferRequestType<typeof client.api.category.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.category.$post>;

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      // لاگ درخواست قبل از ارسال به سرور
      console.log("Sending request to create category:", json);

      try {
        const response = await client.api.category.$post({ json });

        // یک بار بدنه پاسخ را می‌خوانیم و آن را ذخیره می‌کنیم
        const responseData = await response.json();

        // لاگ برای پاسخ دریافتی از سرور
        console.log("Response from server:", responseData);

        return responseData; // از داده‌های خوانده شده استفاده می‌کنیم
      } catch (error) {
        // در صورت بروز خطا در ارتباط با سرور
        console.error("Error while creating category:", error);
        throw error; // در اینجا می‌توان خطا را دوباره پرتاب کرد تا به onError برسد
      }
    },

    onSuccess: () => {
      toast.success("Article Category created");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      // لاگ برای خطا
      console.error("Failed to create category:", error);
      toast.error("Failed to create article category");
    },
  });

  return mutation;
};
