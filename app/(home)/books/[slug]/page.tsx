import { use } from "react";
import BookContent from "@/components/books/BookContent";

export default function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  return (
    <section className="w-full h-full flex flex-col mt-10">
      <BookContent slug={slug} />
    </section>
  );
}
