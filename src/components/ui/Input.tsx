import type React from "react";
import { clsx } from "clsx";

export const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={clsx(
      "w-full rounded-md border border-ink/20 bg-white px-4 py-2 text-sm text-ink shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
      className
    )}
    {...props}
  />
);
