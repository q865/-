import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-rose-dusty-light focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
  {
    variants: {
      variant: {
        default:
          "bg-rose-dusty text-white shadow-float btn-premium-glow hover:bg-rose-dusty-dark",
        secondary:
          "bg-blue-soft-light text-blue-soft-dark shadow-sm hover:bg-blue-soft/40 hover:shadow-float",
        outline:
          "border border-rose-dusty-light/80 bg-neutral-surface text-rose-dusty-dark hover:border-rose-dusty-light hover:bg-rose-dusty-light/25 hover:shadow-float",
        ghost: "text-rose-dusty-dark hover:bg-rose-dusty-light/40",
        dark: "bg-foreground text-cream shadow-float hover:bg-foreground/90",
      },
      size: {
        default: "min-h-11 h-11 px-6 py-2",
        sm: "min-h-9 h-9 px-4",
        lg: "min-h-12 h-12 px-5 text-base sm:px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
