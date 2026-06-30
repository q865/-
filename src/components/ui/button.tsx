import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-rose-dusty-light focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
  {
    variants: {
      variant: {
        default:
          "bg-rose-dusty text-white shadow-sm shadow-rose-dusty/20 hover:bg-rose-dusty-dark hover:shadow-md hover:shadow-rose-dusty/25",
        secondary:
          "bg-blue-soft-light text-blue-soft-dark hover:bg-blue-soft/40",
        outline:
          "border border-rose-dusty-light bg-cream-card text-rose-dusty-dark hover:bg-rose-dusty-light/30",
        ghost: "text-rose-dusty-dark hover:bg-rose-dusty-light/40",
        dark: "bg-[#3d3a36] text-cream hover:bg-[#2d2a26]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
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
