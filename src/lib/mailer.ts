import nodemailer from "nodemailer";

import { logger } from "@/lib/logger";

const smtpConfigured = Boolean(
  process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
);

export const sendLeadNotification = async (payload: {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  listingHeadline?: string | null;
}) => {
  if (!smtpConfigured) {
    logger.warn(
      { lead: payload, event: "lead_notification_skipped" },
      "SMTP not configured, skipping lead email"
    );
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: `CribCove Concierge <${process.env.SMTP_FROM}>`,
    to: process.env.CONCIERGE_EMAIL,
    subject: `New concierge request from ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Phone: ${payload.phone}` : null,
      payload.listingHeadline
        ? `Listing: ${payload.listingHeadline}`
        : null,
      `Message: ${payload.message}`
    ]
      .filter(Boolean)
      .join("\n")
  });
};
