import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">This residence is unavailable</h1>
        <p className="text-ink/60">
          The page you requested could not be found. Explore our curated
          listings instead.
        </p>
        <ButtonLink href="/browse">Browse listings</ButtonLink>
      </div>
    </Container>
  );
}
