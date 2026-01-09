import { type ListingMedia, type Listing as PrismaListing } from "@prisma/client";

export type Listing = PrismaListing & { media: ListingMedia[] };
