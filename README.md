# CribCove

Luxury real estate showcase and concierge-led lead generation platform for high-end homes worldwide.

## Features

- Next.js 14 App Router + TypeScript + Tailwind
- Prisma + Postgres with seed data (12 listings, 6 articles, 4 collections)
- Authenticated admin/editor dashboard with role-based access control
- Concierge lead forms + newsletter signups stored in Postgres
- Cloudinary image upload flow with signed requests
- SEO-ready metadata, sitemap, robots.txt, OpenGraph image, schema.org listing data
- Structured logging, error boundaries, and analytics hooks

## Getting started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start Postgres locally**
   ```bash
   docker-compose up -d
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Run migrations + seed data**
   ```bash
   npm run prisma:migrate
   npm run seed
   ```

5. **Start the dev server**
   ```bash
   npm run dev
   ```

## Admin access

The seed script creates an admin user:

- **Email**: admin@cribcove.ie
- **Password**: concierge2024

## Image uploads

Admin/editor users can upload imagery from `/admin/media`. The flow uses signed Cloudinary requests, and the uploaded URL is displayed for use in listings.

## Deployment (Vercel + custom domain)

1. Create a new Vercel project and connect the repository.
2. Set environment variables from `.env.example` in Vercel.
3. Provision a managed Postgres database (Vercel Postgres, Supabase, or similar) and update `DATABASE_URL`.
4. Add `cribcove.ie` as a custom domain in Vercel and update DNS records (A/ALIAS + CNAME).
5. Deploy. Vercel will run `npm run build` automatically.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run lint` - linting
- `npm run test` - unit tests
- `npm run seed` - seed database

## Notes

- SMTP credentials are optional; without them lead notifications are logged.
- Mailchimp integration is toggled via `MAILCHIMP_ENABLED`.
