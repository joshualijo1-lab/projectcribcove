import Link from "next/link";
import { Container } from "@/components/Container";

export const Footer = () => (
  <footer className="border-t border-ink/10 bg-ivory">
    <Container className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-display text-lg tracking-[0.2em]">CribCove</p>
        <p className="mt-2 text-sm text-ink/60">
          Luxury residences curated across the world. concierge@cribcove.ie
        </p>
      </div>
      <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em] text-ink/70">
        <Link href="/browse">Browse</Link>
        <Link href="/collections">Collections</Link>
        <Link href="/articles">Editorial</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
    </Container>
  </footer>
);
