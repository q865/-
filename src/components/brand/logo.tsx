import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Полная версия с сохранением пропорций (hero, соцсети) */
  variant?: "mark" | "full";
  priority?: boolean;
};

/** Логотип «Воздушное облако» — оригинальное изображение облака с шарами. */
export function Logo({ className, variant = "mark", priority }: LogoProps) {
  return (
    <Image
      src="/brand/logo.png"
      alt="Воздушное облако"
      width={640}
      height={640}
      priority={priority}
      className={cn(
        "h-full w-full object-contain p-0.5",
        variant === "full" && "rounded-2xl",
        className,
      )}
    />
  );
}
