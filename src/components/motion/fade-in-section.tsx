"use client";

import { type ReactNode } from "react";
import { useIsMobileViewport } from "@/hooks/use-is-mobile-viewport";
import { FADE_IN_MAX_DELAY_MS_MOBILE } from "@/lib/animation-config";
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
  const isMobile = useIsMobileViewport();
  const resolvedDelay = isMobile ? Math.min(delayMs, FADE_IN_MAX_DELAY_MS_MOBILE) : delayMs;

  return (
    <Tag
      className={cn("animate-fade-in-up motion-reduce:animate-none", className)}
      style={{ animationDelay: `${resolvedDelay}ms` }}
    >
      {children}
    </Tag>
  );
}
