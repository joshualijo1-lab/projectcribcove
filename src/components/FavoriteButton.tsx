import { toggleFavorite } from "@/lib/actions";

export const FavoriteButton = ({ listingId }: { listingId: string }) => (
  <form action={async () => toggleFavorite(listingId)}>
    <button
      type="submit"
      className="rounded-full border border-ink/20 px-4 py-2 text-xs uppercase tracking-[0.2em]"
    >
      Save
    </button>
  </form>
);
