import BookContent from "@/components/books/BookContent";

export default async function BookPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  return (
    <section className="w-full h-full flex flex-col mt-10">
      <BookContent slug={slug} />
    </section>
  );
}
