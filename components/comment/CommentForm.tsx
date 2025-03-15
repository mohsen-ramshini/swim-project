import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import TextEditor from "@/components/modules/TextEditor";
import { Button } from "../ui/button";

const formSchema = z.object({
  excerpt: z.string().min(10, "چکیده باید حداقل 10 کاراکتر باشد"),
});

export default function MyForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { excerpt: "" },
  });

  const onSubmit = (data: any) => console.log("Form Data:", data);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full sm:w-3/4 mx-auto"
      >
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-center text-xl sm:text-2xl">
                نظر خود را بنویسید
              </FormLabel>
              <FormControl>
                <TextEditor onChange={field.onChange} content={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full sm:w-auto px-6 bg-primary text-white"
        >
          ارسال
        </Button>
      </form>
    </Form>
  );
}
