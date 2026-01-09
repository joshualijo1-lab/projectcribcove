import type React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { clsx } from "clsx";

const baseStyles =
  "inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] transition hover:border-ink hover:bg-ink hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

type ButtonProps =
  | ({ asChild?: false } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ asChild: true } & React.ComponentPropsWithoutRef<typeof Slot>);

export const Button = ({
  className,
  asChild,
  ...props
}: ButtonProps) => {
  const Component = asChild ? Slot : "button";
  return (
    <Component className={clsx(baseStyles, className)} {...props} />
  );
};

export const ButtonLink = ({
  href,
  children,
  className
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Button asChild className={className}>
    <Link href={href}>{children}</Link>
  </Button>
);
