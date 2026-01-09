import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { slugify } from "../src/lib/slugify";

const prisma = new PrismaClient();

const seed = async () => {
  const passwordHash = await bcrypt.hash("concierge2024", 10);

  await prisma.user.upsert({
    where: { email: "admin@cribcove.ie" },
    update: {},
    create: {
      name: "CribCove Admin",
      email: "admin@cribcove.ie",
      passwordHash,
      role: "ADMIN"
    }
  });

  await prisma.listingMedia.deleteMany();
  await prisma.collectionItem.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.article.deleteMany();

  const listings = [
    {
      headline: "Cliffside Panorama Villa",
      summary: "A sculptural villa hovering above the Amalfi coastline with private terraces.",
      story: "<h3>Design</h3><p>A dramatic cantilevered form shaped by local limestone and glass.</p><h3>Experience</h3><p>Private chef's kitchen, infinity pool, and a sunset lounge carved into the cliff.</p>",
      price: 18500000,
      beds: 5,
      baths: 6,
      sqft: 9200,
      acreage: 1.2,
      style: "Contemporary",
      country: "Italy",
      city: "Positano",
      featured: true,
      media: [
        {
          url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
          alt: "Amalfi villa exterior",
          position: 0
        },
        {
          url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
          alt: "Luxury living room",
          position: 1
        }
      ]
    },
    {
      headline: "Harborlight Penthouse",
      summary: "Duplex penthouse overlooking the Marina Bay skyline with curated art spaces.",
      story: "<h3>Signature views</h3><p>Double-height glazing brings the harbor into every living space.</p><h3>Finishes</h3><p>Italian stone, walnut millwork, and a private rooftop pool.</p>",
      price: 22000000,
      beds: 4,
      baths: 5,
      sqft: 8000,
      style: "Modern",
      country: "Singapore",
      city: "Marina Bay",
      featured: true,
      media: [
        {
          url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
          alt: "Penthouse interior",
          position: 0
        }
      ]
    },
    {
      headline: "Azure Ridge Estate",
      summary: "Estate compound with vineyard terraces and a wellness pavilion.",
      story: "<h3>Wellness retreat</h3><p>Includes a spa suite, yoga garden, and cold plunge court.</p>",
      price: 12500000,
      beds: 6,
      baths: 7,
      sqft: 11000,
      acreage: 5.6,
      style: "Tuscan",
      country: "France",
      city: "Saint-Tropez",
      featured: true,
      media: [
        {
          url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
          alt: "French estate",
          position: 0
        }
      ]
    },
    {
      headline: "Palm Crest Mansion",
      summary: "Hollywood Hills mansion with a cinematic screening lounge and gallery hall.",
      story: "<h3>Entertaining</h3><p>Open-plan living with seamless indoor-outdoor flow.</p>",
      price: 19500000,
      beds: 7,
      baths: 8,
      sqft: 14000,
      style: "Mid-century",
      country: "United States",
      city: "Los Angeles",
      featured: true,
      media: [
        {
          url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
          alt: "Los Angeles mansion",
          position: 0
        }
      ]
    },
    {
      headline: "Secluded Coastal Retreat",
      summary: "Private coastal villa with direct beach access and lush gardens.",
      story: "<h3>Privacy</h3><p>Set behind mature hedging with a discreet concierge entrance.</p>",
      priceOnRequest: true,
      beds: 5,
      baths: 5,
      sqft: 7800,
      acreage: 2.4,
      style: "Coastal",
      country: "Portugal",
      city: "Comporta",
      featured: false,
      media: [
        {
          url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
          alt: "Coastal villa",
          position: 0
        }
      ]
    },
    {
      headline: "Northern Light Chalet",
      summary: "Alpine chalet with wellness spa and panoramic ski-in access.",
      story: "<h3>Après-ski</h3><p>Heated stone floors, library lounge, and indoor pool.</p>",
      price: 9800000,
      beds: 6,
      baths: 6,
      sqft: 9000,
      style: "Alpine",
      country: "Switzerland",
      city: "Zermatt",
      featured: false,
      media: [
        {
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
          alt: "Alpine chalet",
          position: 0
        }
      ]
    },
    {
      headline: "Desert Bloom Estate",
      summary: "Architectural desert retreat with infinity-edge pool and sculpture garden.",
      story: "<h3>Architecture</h3><p>Clean lines and warm minimalism designed for desert light.</p>",
      price: 7400000,
      beds: 4,
      baths: 4,
      sqft: 6800,
      style: "Minimalist",
      country: "United States",
      city: "Palm Springs",
      featured: false,
      media: [
        {
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
          alt: "Desert estate",
          position: 0
        }
      ]
    },
    {
      headline: "Mayfair Heritage Townhouse",
      summary: "Restored Georgian townhouse with private garden and library wing.",
      story: "<h3>Heritage</h3><p>Original fireplaces and bespoke joinery throughout.</p>",
      price: 15500000,
      beds: 5,
      baths: 6,
      sqft: 7200,
      style: "Heritage",
      country: "United Kingdom",
      city: "London",
      featured: false,
      media: [
        {
          url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
          alt: "London townhouse",
          position: 0
        }
      ]
    },
    {
      headline: "Emerald Bay Villa",
      summary: "Island villa with lagoon access and private dock.",
      story: "<h3>Waterfront</h3><p>Infinity-edge pool floating above the lagoon.</p>",
      price: 14200000,
      beds: 5,
      baths: 5,
      sqft: 8500,
      style: "Island",
      country: "Maldives",
      city: "North Malé",
      featured: true,
      media: [
        {
          url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
          alt: "Island villa",
          position: 0
        }
      ]
    },
    {
      headline: "Skyline Ridge Residence",
      summary: "Glass-walled residence with skyline views and curated art walls.",
      story: "<h3>Skyline</h3><p>Floor-to-ceiling views over the harbor and city skyline.</p>",
      price: 13000000,
      beds: 4,
      baths: 4,
      sqft: 6000,
      style: "Modern",
      country: "Australia",
      city: "Sydney",
      featured: false,
      media: [
        {
          url: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
          alt: "Sydney residence",
          position: 0
        }
      ]
    },
    {
      headline: "Lagoon Edge Retreat",
      summary: "Waterfront estate with private cinema and spa courtyard.",
      story: "<h3>Leisure</h3><p>Concierge-managed cinema, chef's kitchen, and spa courtyard.</p>",
      price: 16800000,
      beds: 6,
      baths: 7,
      sqft: 12000,
      style: "Resort",
      country: "United Arab Emirates",
      city: "Dubai",
      featured: false,
      media: [
        {
          url: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
          alt: "Dubai estate",
          position: 0
        }
      ]
    },
    {
      headline: "Clifftop Manor",
      summary: "Estate manor with equestrian facilities and Mediterranean gardens.",
      story: "<h3>Estate living</h3><p>Horse stables, orchards, and a private chapel.</p>",
      price: 21000000,
      beds: 8,
      baths: 9,
      sqft: 16000,
      style: "Estate",
      country: "Spain",
      city: "Mallorca",
      featured: false,
      media: [
        {
          url: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
          alt: "Spanish manor",
          position: 0
        }
      ]
    }
  ];

  const createdListings = await Promise.all(
    listings.map((listing) =>
      prisma.listing.create({
        data: {
          headline: listing.headline,
          slug: slugify(listing.headline),
          summary: listing.summary,
          story: listing.story,
          price: listing.price,
          priceOnRequest: listing.priceOnRequest ?? false,
          beds: listing.beds,
          baths: listing.baths,
          sqft: listing.sqft,
          acreage: listing.acreage,
          style: listing.style,
          country: listing.country,
          city: listing.city,
          featured: listing.featured,
          status: "PUBLISHED",
          videoUrl: "https://vimeo.com/823475273",
          brochureUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          media: {
            create: listing.media
          }
        }
      })
    )
  );

  const collections = [
    {
      name: "Top Coastal Villas",
      summary: "Salt-kissed retreats with direct ocean access and infinity pools.",
      listings: createdListings.slice(0, 3)
    },
    {
      name: "Modern Mansions",
      summary: "Architectural icons with bold forms, glass walls, and curated art.",
      listings: createdListings.slice(3, 6)
    },
    {
      name: "Heritage Estates",
      summary: "Timeless manor homes with heritage craftsmanship and privacy.",
      listings: createdListings.slice(6, 9)
    },
    {
      name: "Island Hideaways",
      summary: "Remote sanctuaries designed for restorative living.",
      listings: createdListings.slice(9, 12)
    }
  ];

  for (const collection of collections) {
    const created = await prisma.collection.create({
      data: {
        name: collection.name,
        slug: slugify(collection.name),
        summary: collection.summary,
        items: {
          create: collection.listings.map((listing, index) => ({
            listingId: listing.id,
            position: index
          }))
        }
      }
    });

    await prisma.collection.update({
      where: { id: created.id },
      data: { updatedAt: new Date() }
    });
  }

  const articles = [
    {
      title: "Buying a Villa in the Amalfi Coast",
      excerpt: "A concierge guide to securing cliffside residences with sea views.",
      content: "<p>From Positano to Ravello, coastal villas require local expertise and discreet negotiation.</p>",
      coverUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
      author: "Isla Morgan"
    },
    {
      title: "The Rise of Modern Alpine Living",
      excerpt: "Why ski-in, ski-out estates are redefining luxury in Europe.",
      content: "<p>Alpine architecture now blends minimalist glass with traditional chalet warmth.</p>",
      coverUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
      author: "Luca Moretti"
    },
    {
      title: "Designing a Wellness Residence",
      excerpt: "Curating spa-grade amenities that elevate daily rituals.",
      content: "<p>Wellness estates integrate hydrotherapy, meditation rooms, and privacy.</p>",
      coverUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      author: "Chloe Renaud"
    },
    {
      title: "How to Vet a Private Island Estate",
      excerpt: "Due diligence essentials for island acquisitions and concierge logistics.",
      content: "<p>Access rights, infrastructure, and sustainability plans are critical.</p>",
      coverUrl: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
      author: "Aiden Shaw"
    },
    {
      title: "Curating a Legacy Collection",
      excerpt: "Estate planning for multi-generation residences in Europe.",
      content: "<p>Heritage listings require legal and tax strategy alongside preservation.</p>",
      coverUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80",
      author: "Sofia Clarke"
    },
    {
      title: "Luxury Real Estate Outlook 2025",
      excerpt: "Global trends shaping the next wave of high-end property acquisitions.",
      content: "<p>Demand is shifting toward experiential living and concierge-led services.</p>",
      coverUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
      author: "Noah Bennett"
    }
  ];

  for (const article of articles) {
    await prisma.article.create({
      data: {
        title: article.title,
        slug: slugify(article.title),
        excerpt: article.excerpt,
        content: article.content,
        coverUrl: article.coverUrl,
        author: article.author,
        status: "PUBLISHED"
      }
    });
  }
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
