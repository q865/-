import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-2xl border border-neutral-border bg-neutral-surface px-4 py-3 text-base text-foreground shadow-sm outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-neutral-text focus:border-gold-muted-light focus:ring-2 focus:ring-gold-muted-light/40 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
