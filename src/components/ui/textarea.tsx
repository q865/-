import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full rounded-xl border border-rose-dusty-light/70 bg-cream-card px-4 py-3 text-sm text-[#3d3a36] outline-none transition-colors placeholder:text-[#9c9590] focus:border-blue-soft focus:ring-2 focus:ring-blue-soft-light disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
