"use client";

import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { useIsMobileViewport } from "@/hooks/use-is-mobile-viewport";
import { cn } from "@/lib/utils";
import {
  STAGGER_MAX_DELAY_MS,
  STAGGER_MAX_DELAY_MS_MOBILE,
  STAGGER_STEP_MS,
  STAGGER_STEP_MS_MOBILE,
} from "@/lib/animation-config";

type StaggerGridProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Каскадное появление карточек через CSS animation-delay.
 * Оборачивает grid/flex-контейнер и анимирует прямых потомков без лишних div.
 */
export function StaggerGrid({ children, className }: StaggerGridProps) {
  const isMobile = useIsMobileViewport();
  const step = isMobile ? STAGGER_STEP_MS_MOBILE : STAGGER_STEP_MS;
  const maxDelay = isMobile ? STAGGER_MAX_DELAY_MS_MOBILE : STAGGER_MAX_DELAY_MS;

  return (
    <div className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement<{ className?: string; style?: React.CSSProperties }>(child)) {
          return child;
        }

        return cloneElement(child, {
          className: cn(child.props.className, "animate-fade-in-up motion-reduce:animate-none"),
          style: {
            ...child.props.style,
            animationDelay: `${Math.min(index * step, maxDelay)}ms`,
          },
        });
      })}
    </div>
  );
}
