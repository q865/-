"use client";

import { Children, isValidElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { STAGGER_MAX_DELAY_MS, STAGGER_STEP_MS } from "@/lib/animation-config";

type StaggerGridProps = {
  children: ReactNode;
  className?: string;
  /** Отключить stagger на touch-устройствах — только fade-in */
  mobileSimple?: boolean;
};

/**
 * Оборачивает список карточек и задаёт каскадное появление через CSS-переменные.
 * Без JS-анимаций — только CSS, дружелюбно к перформансу.
 */
export function StaggerGrid({ children, className, mobileSimple = true }: StaggerGridProps) {
  const items = Children.toArray(children).filter(isValidElement);

  return (
    <div
      className={cn(
        "grid",
        mobileSimple && "[@media(hover:none)]:[&>*]:animate-fade-in-up",
        className,
      )}
    >
      {items.map((child, index) => (
        <div
          key={child.key ?? index}
          className={cn(
            "animate-fade-in-up motion-reduce:animate-none",
            mobileSimple &&
              "[@media(hover:none)]:[animation-delay:0ms!important] [@media(hover:hover)]:animate-fade-in-up",
          )}
          style={{
            animationDelay: `${Math.min(index * STAGGER_STEP_MS, STAGGER_MAX_DELAY_MS)}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
