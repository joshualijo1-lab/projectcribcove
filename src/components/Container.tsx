import type React from "react";
import { clsx } from "clsx";

export const Container = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx("mx-auto w-full max-w-6xl px-6", className)} {...props} />
);
