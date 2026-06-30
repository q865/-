import * as React from "react";
import { cn } from "@/lib/utils";

function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "flex h-11 w-full rounded-xl border border-rose-dusty-light/70 bg-cream-card px-4 text-sm text-[#3d3a36] outline-none transition-colors focus:border-blue-soft focus:ring-2 focus:ring-blue-soft-light disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Select };
