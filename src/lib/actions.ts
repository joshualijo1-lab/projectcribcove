"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { trackEvent } from "@/lib/analytics";
import { leadSchema, newsletterSchema } from "@/lib/validators";
import { sendLeadNotification } from "@/lib/mailer";

export const submitLead = async (formData: FormData) => {
  const raw = Object.fromEntries(formData.entries());
  const parsed = leadSchema.safeParse({
    name: raw.name,
    email: raw.email,
    phone: raw.phone,
    message: raw.message,
    listingId: raw.listingId
  });

  if (!parsed.success) {
    return { ok: false, error: "Please complete all fields." };
  }

  const session = await auth();
  const lead = await prisma.lead.create({
    data: {
      ...parsed.data,
      userId: session?.user?.id
    }
  });

  const listing = parsed.data.listingId
    ? await prisma.listing.findUnique({
        where: { id: parsed.data.listingId }
      })
    : null;

  await sendLeadNotification({
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    message: lead.message,
    listingHeadline: listing?.headline
  });

  await trackEvent("lead_submitted", {
    leadId: lead.id,
    listingId: parsed.data.listingId ?? null
  });

  logger.info({ leadId: lead.id }, "lead_submitted");

  return { ok: true };
};

export const submitNewsletter = async (formData: FormData) => {
  const raw = Object.fromEntries(formData.entries());
  const parsed = newsletterSchema.safeParse({
    email: raw.email
  });

  if (!parsed.success) {
    return { ok: false, error: "Please provide a valid email." };
  }

  await prisma.newsletterSubscriber.upsert({
    where: { email: parsed.data.email.toLowerCase() },
    create: { email: parsed.data.email.toLowerCase() },
    update: {}
  });

  if (process.env.MAILCHIMP_ENABLED === "true") {
    logger.info({ email: parsed.data.email }, "mailchimp_sync_pending");
  }

  await trackEvent("newsletter_signup", { email: parsed.data.email });

  logger.info({ email: parsed.data.email }, "newsletter_signup");

  return { ok: true };
};

export const toggleFavorite = async (listingId: string) => {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, error: "Please sign in." };
  }

  const existing = await prisma.favorite.findUnique({
    where: { userId_listingId: { userId: session.user.id, listingId } }
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
  } else {
    await prisma.favorite.create({
      data: { userId: session.user.id, listingId }
    });
  }

  revalidatePath("/account");
  return { ok: true };
};
