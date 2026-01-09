import type { Metadata } from "next";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "https://cribcove.ie/privacy" }
};

export default function PrivacyPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-3xl space-y-4">
        <h1 className="text-4xl font-semibold">Privacy policy</h1>
        <p className="text-ink/60">
          CribCove respects your privacy and handles personal data for concierge
          requests and newsletter subscriptions only. We never sell your data.
        </p>
        <p className="text-ink/60">
          Contact concierge@cribcove.ie for data access or removal requests.
        </p>
      </div>
    </Container>
  );
}
