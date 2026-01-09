import Link from "next/link";
import { auth } from "@/lib/auth";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/Container";

const navItems = [
  { href: "/browse", label: "Browse" },
  { href: "/collections", label: "Collections" },
  { href: "/articles", label: "Editorial" }
];

export const Header = async () => {
  const session = await auth();

  return (
    <header className="border-b border-ink/10 bg-ivory/80 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        <Link href="/" className="text-xl font-display tracking-[0.3em]">
          CRIBCOVE
        </Link>
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.2em] md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-ink/70 hover:text-ink">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="text-ink/70 hover:text-ink">
            Concierge
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {session?.user ? (
            <ButtonLink href="/account">Account</ButtonLink>
          ) : (
            <ButtonLink href="/login">Sign in</ButtonLink>
          )}
        </div>
      </Container>
    </header>
  );
};
