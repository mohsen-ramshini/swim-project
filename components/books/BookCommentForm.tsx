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
import { useCreateBookComment } from "@/features/bookComment/api/use-create-book-comment";
import { insertBookCommentsSchema } from "@/db/schema/book/bookComment";

const formSchema = insertBookCommentsSchema.pick({
  text: true,
  bookId: true,
  parentId: true,
  userId: true,
});

interface Props {
  ID: number;
}

type FormValues = z.input<typeof formSchema>;

export default function MyForm({ ID }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { text: "", bookId: ID, parentId: 9, userId: 1 },
  });
  const mutation = useCreateBookComment();

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full sm:w-3/4 mx-auto"
      >
        <FormField
          control={form.control}
          name="text"
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
