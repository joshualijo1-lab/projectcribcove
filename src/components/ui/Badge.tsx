import type React from "react";
import { clsx } from "clsx";

export const Badge = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={clsx(
      "inline-flex items-center rounded-full border border-ink/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-ink/70",
      className
    )}
    {...props}
  />
);
