import * as React from "react";
import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm font-medium text-[#5c5651]", className)}
      {...props}
    />
  );
}

export { Label };
