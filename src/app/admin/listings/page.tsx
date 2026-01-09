import Link from "next/link";
import { Container } from "@/components/Container";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";

export default async function AdminListingsPage() {
  await requireAdmin();
  const listings = await prisma.listing.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <Container className="py-16">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
              Listings
            </p>
            <h1 className="text-3xl font-semibold">Manage listings</h1>
          </div>
          <Link href="/admin" className="text-xs uppercase tracking-[0.2em] underline">
            Back to dashboard
          </Link>
        </div>
        <div className="space-y-3">
          {listings.map((listing) => (
            <div key={listing.id} className="rounded-2xl border border-ink/10 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{listing.headline}</p>
                  <p className="text-sm text-ink/60">
                    {listing.city}, {listing.country}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                  {listing.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
