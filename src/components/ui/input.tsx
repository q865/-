import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-rose-dusty-light/70 bg-cream-card px-4 py-2 text-sm text-[#3d3a36] outline-none transition-colors placeholder:text-[#9c9590] focus:border-blue-soft focus:ring-2 focus:ring-blue-soft-light disabled:cursor-not-allowed disabled:opacity-60",
        type === "file" &&
          "cursor-pointer file:mr-3 file:rounded-lg file:border-0 file:bg-rose-dusty-light/50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-rose-dusty-dark hover:file:bg-rose-dusty-light",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
