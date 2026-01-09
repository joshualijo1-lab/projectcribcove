import Link from "next/link";
import { Container } from "@/components/Container";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";

export default async function AdminPage() {
  await requireAdmin();

  const [listingCount, leadCount, articleCount] = await Promise.all([
    prisma.listing.count(),
    prisma.lead.count(),
    prisma.article.count()
  ]);

  return (
    <Container className="py-16">
      <div className="space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Admin</p>
          <h1 className="text-4xl font-semibold">CribCove editorial suite</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-ink/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Listings</p>
            <p className="mt-4 text-3xl font-semibold">{listingCount}</p>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Leads</p>
            <p className="mt-4 text-3xl font-semibold">{leadCount}</p>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Articles</p>
            <p className="mt-4 text-3xl font-semibold">{articleCount}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.2em]">
          <Link href="/admin/listings" className="rounded-full border border-ink/20 px-4 py-2">
            Manage listings
          </Link>
          <Link href="/admin/articles" className="rounded-full border border-ink/20 px-4 py-2">
            Manage articles
          </Link>
          <Link href="/admin/media" className="rounded-full border border-ink/20 px-4 py-2">
            Upload media
          </Link>
        </div>
      </div>
    </Container>
  );
}
