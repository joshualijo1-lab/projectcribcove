"use client";

import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/Container";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold">Something went wrong</h1>
        <p className="text-ink/60">
          Our concierge team is working on it. Please try again.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="rounded-full border border-ink/20 px-5 py-2 text-xs uppercase tracking-[0.2em]"
          >
            Retry
          </button>
          <ButtonLink href="/">Return home</ButtonLink>
        </div>
      </div>
    </Container>
  );
}
