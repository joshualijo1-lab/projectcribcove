import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { submitLead, submitNewsletter } from "@/lib/actions";

export const metadata: Metadata = {
  title: "Contact Concierge",
  alternates: { canonical: "https://cribcove.ie/contact" }
};

export default function ContactPage() {
  return (
    <Container className="py-16">
      <div className="grid gap-12 lg:grid-cols-[2fr,1fr]">
        <section className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
              Concierge
            </p>
            <h1 className="text-4xl font-semibold">Request a private viewing</h1>
            <p className="mt-2 text-ink/60">
              Share your requirements and our concierge team will curate a
              tailored itinerary within 24 hours.
            </p>
          </div>
          <form action={submitLead} className="space-y-4">
            <Input name="name" placeholder="Full name" required />
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="phone" placeholder="Phone (optional)" />
            <Textarea name="message" rows={6} placeholder="Describe your ideal residence" required />
            <Button type="submit">Send request</Button>
          </form>
        </section>

        <aside className="space-y-6 rounded-3xl border border-ink/10 bg-white p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
              Newsletter
            </p>
            <h2 className="mt-3 text-2xl font-semibold">CribCove Dispatch</h2>
            <p className="mt-2 text-sm text-ink/60">
              Private releases, editorial insights, and concierge intelligence.
            </p>
          </div>
          <form action={submitNewsletter} className="space-y-3">
            <Input name="email" type="email" placeholder="Email" required />
            <Button type="submit" className="w-full">
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-ink/50">
            By subscribing you agree to receive editorial and listing updates.
          </p>
        </aside>
      </div>
    </Container>
  );
}
