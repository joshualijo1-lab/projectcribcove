import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { ListingCard } from "@/components/ListingCard";
import { getCollectionBySlug } from "@/lib/queries";

export const generateMetadata = async ({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) return {};

  return {
    title: collection.name,
    description: collection.summary,
    alternates: {
      canonical: `https://cribcove.ie/collections/${collection.slug}`
    }
  };
};

export default async function CollectionDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection) {
    notFound();
  }

  return (
    <Container className="py-16">
      <div className="space-y-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
            Collection
          </p>
          <h1 className="text-4xl font-semibold">{collection.name}</h1>
          <p className="mt-2 text-lg text-ink/60">{collection.summary}</p>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {collection.items.map((item) => (
            <ListingCard key={item.id} listing={item.listing} />
          ))}
        </div>
      </div>
    </Container>
  );
}
