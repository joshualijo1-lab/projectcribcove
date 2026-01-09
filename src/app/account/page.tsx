import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Account",
  alternates: { canonical: "https://cribcove.ie/account" }
};

const signOutAction = async () => {
  "use server";
  await signOut({ redirectTo: "/" });
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { listing: { include: { media: true } } }
  });

  return (
    <Container className="py-16">
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
              Account
            </p>
            <h1 className="text-4xl font-semibold">Welcome, {session.user.name ?? "Member"}</h1>
          </div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.2em]"
            >
              Sign out
            </button>
          </form>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Saved residences</h2>
          {favorites.length === 0 ? (
            <p className="text-sm text-ink/60">
              You have no saved listings yet. Explore the latest residences in the
              <Link href="/browse" className="ml-1 underline">browse</Link> section.
            </p>
          ) : (
            <ul className="space-y-3">
              {favorites.map((favorite) => (
                <li key={favorite.id} className="rounded-2xl border border-ink/10 bg-white p-4">
                  <Link href={`/listings/${favorite.listing.slug}`} className="text-lg font-semibold">
                    {favorite.listing.headline}
                  </Link>
                  <p className="text-sm text-ink/60">
                    {favorite.listing.city}, {favorite.listing.country}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {session.user.role !== "USER" ? (
          <section className="rounded-3xl border border-ink/10 bg-white p-6">
            <h2 className="text-2xl font-semibold">Editorial tools</h2>
            <p className="mt-2 text-sm text-ink/60">
              Manage listings, collections, and editorial content.
            </p>
            <Link
              href="/admin"
              className="mt-4 inline-block text-xs uppercase tracking-[0.2em] underline"
            >
              Open admin dashboard
            </Link>
          </section>
        ) : null}
      </div>
    </Container>
  );
}
