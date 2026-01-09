import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { getArticles } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Editorial",
  alternates: { canonical: "https://cribcove.ie/articles" }
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <Container className="py-16">
      <div className="space-y-10">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
            Editorial
          </p>
          <h1 className="text-4xl font-semibold">The CribCove Journal</h1>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="group rounded-3xl border border-ink/10 bg-white p-6"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={article.coverUrl}
                  alt={article.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <h2 className="mt-4 text-2xl font-semibold group-hover:text-gold">
                {article.title}
              </h2>
              <p className="mt-2 text-sm text-ink/60">{article.excerpt}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-ink/50">
                {article.author}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
