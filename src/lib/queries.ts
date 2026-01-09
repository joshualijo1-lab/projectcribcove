import { prisma } from "@/lib/prisma";

export const getFeaturedListings = async () =>
  prisma.listing.findMany({
    where: { status: "PUBLISHED", featured: true },
    include: { media: { orderBy: { position: "asc" } } },
    take: 6
  });

export const getListingBySlug = async (slug: string) =>
  prisma.listing.findUnique({
    where: { slug },
    include: {
      media: { orderBy: { position: "asc" } },
      collections: { include: { collection: true } }
    }
  });

export const getListings = async (filters?: {
  country?: string;
  city?: string;
  style?: string;
  priceBand?: string;
}) => {
  const priceFilter = () => {
    switch (filters?.priceBand) {
      case "under-5m":
        return { lt: 5_000_000 };
      case "5m-15m":
        return { gte: 5_000_000, lte: 15_000_000 };
      case "15m-plus":
        return { gt: 15_000_000 };
      default:
        return undefined;
    }
  };

  return prisma.listing.findMany({
    where: {
      status: "PUBLISHED",
      country: filters?.country,
      city: filters?.city,
      style: filters?.style,
      price: priceFilter()
    },
    include: { media: { orderBy: { position: "asc" } } },
    orderBy: { createdAt: "desc" }
  });
};

export const getCollections = async () =>
  prisma.collection.findMany({
    include: {
      items: {
        include: {
          listing: { include: { media: { orderBy: { position: "asc" } } } }
        },
        orderBy: { position: "asc" }
      }
    },
    orderBy: { createdAt: "desc" }
  });

export const getCollectionBySlug = async (slug: string) =>
  prisma.collection.findUnique({
    where: { slug },
    include: {
      items: {
        include: {
          listing: { include: { media: { orderBy: { position: "asc" } } } }
        },
        orderBy: { position: "asc" }
      }
    }
  });

export const getArticles = async () =>
  prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" }
  });

export const getArticleBySlug = async (slug: string) =>
  prisma.article.findUnique({
    where: { slug }
  });

export const getDestinations = async () =>
  prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    distinct: ["country", "city"],
    select: { country: true, city: true }
  });

export const getStyles = async () =>
  prisma.listing.findMany({
    where: { status: "PUBLISHED" },
    distinct: ["style"],
    select: { style: true }
  });
