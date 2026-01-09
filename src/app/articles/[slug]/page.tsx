import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getArticleBySlug } from "@/lib/queries";

export const generateMetadata = async ({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `https://cribcove.ie/articles/${article.slug}`
    }
  };
};

export default async function ArticleDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const article = await getArticleBySlug(params.slug);
  if (!article || article.status !== "PUBLISHED") {
    notFound();
  }

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
            {article.author}
          </p>
          <h1 className="text-4xl font-semibold">{article.title}</h1>
          <p className="text-lg text-ink/60">{article.excerpt}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image src={article.coverUrl} alt={article.title} fill className="object-cover" />
        </div>
        <article className="prose-rich max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>
      </div>
    </Container>
  );
}
