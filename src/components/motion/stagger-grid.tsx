"use client";

import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STAGGER_MAX_DELAY_MS, STAGGER_STEP_MS } from "@/lib/animation-config";

type StaggerGridProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Каскадное появление карточек через CSS animation-delay.
 * Оборачивает grid/flex-контейнер и анимирует прямых потомков без лишних div.
 */
export function StaggerGrid({ children, className }: StaggerGridProps) {
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
            animationDelay: `${Math.min(index * STAGGER_STEP_MS, STAGGER_MAX_DELAY_MS)}ms`,
          },
        });
      })}
    </div>
  );
}
