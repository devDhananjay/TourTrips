"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  target?: string;
  rel?: string;
  form?: string;
};

const variants = {
  primary:
    "bg-brand text-white hover:bg-brand-dark shadow-sm shadow-brand/20",
  secondary: "bg-foreground text-white hover:bg-stone-800",
  outline:
    "border border-border bg-white text-foreground hover:border-brand hover:text-brand",
  ghost: "bg-transparent text-foreground hover:bg-surface-2",
  accent: "bg-accent text-brand-dark hover:bg-accent-dark hover:text-white",
};

const sizes = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  onClick,
  disabled,
  target,
  rel,
  form,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      form={form}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
