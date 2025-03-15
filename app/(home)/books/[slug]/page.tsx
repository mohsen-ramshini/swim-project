import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeftCircle, Share2 } from "lucide-react";
import { notFound } from "next/navigation";
import Profile from "@/components/articles/Profile";
import BookInterface from "@/components/books/BookInterface";
import BookDetails from "@/components/books/BookDetails";
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
