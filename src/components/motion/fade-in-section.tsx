"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "section" | "article";
};

/** Плавное появление блока снизу вверх — один элемент без stagger. */
export function FadeIn({
  children,
  className,
  delayMs = 0,
  as: Tag = "div",
}: FadeInProps) {
  return (
    <Tag
      className={cn("animate-fade-in-up motion-reduce:animate-none", className)}
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {children}
    </Tag>
  );
}
