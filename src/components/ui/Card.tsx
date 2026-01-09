import type React from "react";
import { clsx } from "clsx";

export const Card = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      "rounded-3xl border border-ink/10 bg-white p-6 shadow-sm",
      className
    )}
    {...props}
  />
);
