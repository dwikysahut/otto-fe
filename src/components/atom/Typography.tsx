import React, { ReactNode } from "react";

type TypographyProps = {
  children: ReactNode;
  tag?: "p" | "h1" | "h2" | "h3" | "h4" | "span"; // Allows specifying HTML tags like p, h1, h2, etc.
  style?: string; // Tailwind or custom class styles
};

export default function Typography({ children, tag: Tag = "p", style }: TypographyProps) {
  return <Tag className={`${style} text-lg`}>{children}</Tag>;
}
