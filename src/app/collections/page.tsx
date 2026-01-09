import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getCollections } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Collections",
  alternates: { canonical: "https://cribcove.ie/collections" }
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <Container className="py-16">
      <div className="space-y-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
            Collections
          </p>
          <h1 className="text-4xl font-semibold">Curated journeys</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="rounded-3xl border border-ink/10 bg-white p-8"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                {collection.items.length} listings
              </p>
              <h2 className="mt-3 text-2xl font-semibold">{collection.name}</h2>
              <p className="mt-2 text-sm text-ink/60">{collection.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
