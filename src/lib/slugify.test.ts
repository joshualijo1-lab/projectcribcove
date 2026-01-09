import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slugify";

describe("slugify", () => {
  it("creates URL-safe slugs", () => {
    expect(slugify("Luxury Villa in Côte d'Azur")).toBe(
      "luxury-villa-in-cote-dazur"
    );
  });
});
