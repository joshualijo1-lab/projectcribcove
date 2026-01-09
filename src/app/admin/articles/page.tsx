import Link from "next/link";
import { Container } from "@/components/Container";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/rbac";

export default async function AdminArticlesPage() {
  await requireAdmin();
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <Container className="py-16">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
              Editorial
            </p>
            <h1 className="text-3xl font-semibold">Manage articles</h1>
          </div>
          <Link href="/admin" className="text-xs uppercase tracking-[0.2em] underline">
            Back to dashboard
          </Link>
        </div>
        <div className="space-y-3">
          {articles.map((article) => (
            <div key={article.id} className="rounded-2xl border border-ink/10 bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{article.title}</p>
                  <p className="text-sm text-ink/60">{article.author}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                  {article.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
