import { Metadata } from "next";
import { Container } from "@/components/Container";
import { ListingCard } from "@/components/ListingCard";
import { Select } from "@/components/ui/Select";
import { getDestinations, getListings, getStyles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Browse Listings",
  alternates: { canonical: "https://cribcove.ie/browse" }
};

export default async function BrowsePage({
  searchParams
}: {
  searchParams: {
    country?: string;
    city?: string;
    style?: string;
    priceBand?: string;
  };
}) {
  const [listings, destinations, styles] = await Promise.all([
    getListings(searchParams),
    getDestinations(),
    getStyles()
  ]);

  const countries = Array.from(
    new Set(destinations.map((item) => item.country))
  ).sort();
  const cities = destinations
    .filter((item) => (searchParams.country ? item.country === searchParams.country : true))
    .map((item) => item.city)
    .sort();

  return (
    <Container className="py-16">
      <div className="flex flex-col gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
            Browse
          </p>
          <h1 className="text-4xl font-semibold">Discover elite addresses</h1>
        </div>

        <form className="grid gap-4 md:grid-cols-4" method="get">
          <Select name="country" defaultValue={searchParams.country ?? ""}>
            <option value="">All countries</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
          <Select name="city" defaultValue={searchParams.city ?? ""}>
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Select>
          <Select name="style" defaultValue={searchParams.style ?? ""}>
            <option value="">All styles</option>
            {styles.map((style) => (
              <option key={style.style} value={style.style}>
                {style.style}
              </option>
            ))}
          </Select>
          <Select name="priceBand" defaultValue={searchParams.priceBand ?? ""}>
            <option value="">Any price</option>
            <option value="under-5m">Under €5M</option>
            <option value="5m-15m">€5M - €15M</option>
            <option value="15m-plus">€15M+</option>
          </Select>
          <button
            type="submit"
            className="col-span-full rounded-full border border-ink/20 px-5 py-2 text-sm uppercase tracking-[0.2em]"
          >
            Apply filters
          </button>
        </form>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </Container>
  );
}
