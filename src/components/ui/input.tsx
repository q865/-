import * as React from "react";
import { cn } from "@/lib/utils";

const formControlClassName =
  "flex w-full rounded-2xl border border-neutral-border bg-neutral-surface px-4 text-base text-foreground shadow-sm outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-neutral-text focus:border-rose-dusty-light focus:ring-2 focus:ring-rose-dusty-light/40 disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        formControlClassName,
        "h-11 py-2",
        type === "file" &&
          "cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-rose-dusty-light/50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-rose-dusty-dark hover:file:bg-rose-dusty-light",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
