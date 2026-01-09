import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [listings, collections, articles] = await Promise.all([
    prisma.listing.findMany({ where: { status: "PUBLISHED" } }),
    prisma.collection.findMany(),
    prisma.article.findMany({ where: { status: "PUBLISHED" } })
  ]);

  const baseUrl = "https://cribcove.ie";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/browse`, lastModified: new Date() },
    { url: `${baseUrl}/collections`, lastModified: new Date() },
    { url: `${baseUrl}/articles`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    ...listings.map((listing) => ({
      url: `${baseUrl}/listings/${listing.slug}`,
      lastModified: listing.updatedAt
    })),
    ...collections.map((collection) => ({
      url: `${baseUrl}/collections/${collection.slug}`,
      lastModified: collection.updatedAt
    })),
    ...articles.map((article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.updatedAt
    }))
  ];
}
