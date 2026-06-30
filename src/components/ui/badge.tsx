import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-cream-card/95 px-3 py-1 text-xs font-medium text-rose-dusty-dark backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
