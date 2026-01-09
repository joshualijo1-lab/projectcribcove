import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { getCollections, getFeaturedListings } from "@/lib/queries";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui/Button";
import { ListingCard } from "@/components/ListingCard";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Luxury Real Estate Curated Worldwide",
  alternates: { canonical: "https://cribcove.ie" }
};

export default async function HomePage() {
  const [featuredListings, collections] = await Promise.all([
    getFeaturedListings(),
    getCollections()
  ]);

  return (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury home"
            fill
            className="object-cover"
            priority
          />
        </div>
        <Container className="relative z-10 flex flex-col gap-10 py-24">
          <Badge className="border-ivory/40 text-ivory">CribCove Concierge</Badge>
          <div className="max-w-2xl space-y-6">
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              Curated luxury residences with a private viewing experience.
            </h1>
            <p className="text-lg text-ivory/80">
              Discover villas, penthouses, and estates hand-selected by our
              editors. Every listing is accompanied by bespoke editorial
              storytelling and a concierge-led journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/browse" className="border-ivory text-ivory hover:text-ink">
                Explore listings
              </ButtonLink>
              <ButtonLink href="/contact" className="border-ivory text-ivory hover:text-ink">
                Speak with concierge
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                Featured
              </p>
              <h2 className="text-3xl font-semibold">
                Global estates & rare residences
              </h2>
            </div>
            <ButtonLink href="/browse">Browse all</ButtonLink>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white/70 py-16">
        <Container className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                Collections
              </p>
              <h2 className="text-3xl font-semibold">Curated journeys</h2>
            </div>
            <ButtonLink href="/collections">View collections</ButtonLink>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="group rounded-3xl border border-ink/10 bg-white p-8"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
                  {collection.items.length} listings
                </p>
                <h3 className="mt-3 text-2xl font-semibold group-hover:text-gold">
                  {collection.name}
                </h3>
                <p className="mt-2 text-sm text-ink/60">
                  {collection.summary}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
