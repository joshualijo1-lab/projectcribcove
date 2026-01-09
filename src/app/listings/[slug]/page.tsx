import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { FavoriteButton } from "@/components/FavoriteButton";
import { getListingBySlug } from "@/lib/queries";
import { submitLead } from "@/lib/actions";

export const generateMetadata = async ({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const listing = await getListingBySlug(params.slug);
  if (!listing) {
    return {};
  }

  return {
    title: listing.headline,
    description: listing.summary,
    alternates: {
      canonical: `https://cribcove.ie/listings/${listing.slug}`
    },
    openGraph: {
      title: listing.headline,
      description: listing.summary,
      images: listing.media[0]?.url ? [{ url: listing.media[0].url }] : []
    }
  };
};

export default async function ListingDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const listing = await getListingBySlug(params.slug);
  if (!listing || listing.status !== "PUBLISHED") {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.headline,
    description: listing.summary,
    url: `https://cribcove.ie/listings/${listing.slug}`,
    image: listing.media.map((item) => item.url),
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city,
      addressCountry: listing.country
    },
    numberOfRooms: listing.beds,
    floorSize: listing.sqft
      ? { "@type": "QuantitativeValue", value: listing.sqft, unitCode: "FTK" }
      : undefined
  };

  return (
    <Container className="py-16">
      <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge>{listing.city}, {listing.country}</Badge>
            <h1 className="text-4xl font-semibold">{listing.headline}</h1>
            <p className="text-lg text-ink/70">{listing.summary}</p>
            <FavoriteButton listingId={listing.id} />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {listing.media.map((media) => (
              <div key={media.id} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image src={media.url} alt={media.alt} fill className="object-cover" />
              </div>
            ))}
          </div>

          <article className="prose-rich max-w-none">
            <div dangerouslySetInnerHTML={{ __html: listing.story }} />
          </article>
        </div>

        <aside className="space-y-6 rounded-3xl border border-ink/10 bg-white p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Specs</p>
            <div className="mt-4 space-y-2 text-sm text-ink/70">
              <p>{listing.beds} bedrooms</p>
              <p>{listing.baths} bathrooms</p>
              <p>{listing.sqft.toLocaleString()} sq ft</p>
              {listing.acreage ? <p>{listing.acreage} acres</p> : null}
              <p>Style: {listing.style}</p>
              <p>
                Price: {listing.priceOnRequest ? "Price on request" : `€${listing.price?.toLocaleString()}`}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Concierge</p>
            <form action={submitLead} className="mt-4 space-y-3">
              <input type="hidden" name="listingId" value={listing.id} />
              <Input name="name" placeholder="Full name" required />
              <Input name="email" type="email" placeholder="Email" required />
              <Input name="phone" placeholder="Phone (optional)" />
              <Textarea name="message" rows={4} placeholder="Tell us about your viewing request" required />
              <Button type="submit" className="w-full">
                Request private viewing
              </Button>
            </form>
          </div>

          {listing.videoUrl ? (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Video</p>
              <a href={listing.videoUrl} className="mt-2 block text-sm text-ink underline">
                Watch the full walkthrough
              </a>
            </div>
          ) : null}

          {listing.brochureUrl ? (
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Brochure</p>
              <a href={listing.brochureUrl} className="mt-2 block text-sm text-ink underline">
                Download brochure
              </a>
            </div>
          ) : null}
        </aside>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Container>
  );
}
