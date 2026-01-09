import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { type Listing } from "@/lib/types";

export const ListingCard = ({ listing }: { listing: Listing }) => {
  const image = listing.media[0];
  return (
    <Link
      href={`/listings/${listing.slug}`}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-ink/5 text-ink/40">
            Image coming soon
          </div>
        )}
      </div>
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink/60">
        <span>
          {listing.city}, {listing.country}
        </span>
        {listing.featured && <Badge>Featured</Badge>}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-ink group-hover:text-gold">
          {listing.headline}
        </h3>
        <p className="mt-2 text-sm text-ink/60">{listing.summary}</p>
      </div>
    </Link>
  );
};
