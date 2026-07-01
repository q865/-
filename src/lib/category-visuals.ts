import {
  Building2,
  Cake,
  Heart,
  PartyPopper,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type CategoryVisual = {
  icon: LucideIcon;
  bgClass: string;
  iconClass: string;
};

const DEFAULT: CategoryVisual = {
  icon: Sparkles,
  bgClass: "bg-gold-muted-light/60",
  iconClass: "text-gold-muted-dark",
};

export const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  "gender-pati": {
    icon: PartyPopper,
    bgClass: "bg-rose-dusty-light/70",
    iconClass: "text-rose-dusty-dark",
  },
  vypiska: {
    icon: Heart,
    bgClass: "bg-blue-soft-light/80",
    iconClass: "text-blue-soft-dark",
  },
  "dni-rozhdeniya": {
    icon: Cake,
    bgClass: "bg-yellow-soft/70",
    iconClass: "text-yellow-soft-dark",
  },
  svadby: {
    icon: Heart,
    bgClass: "bg-lavender-soft/80",
    iconClass: "text-rose-dusty-dark",
  },
  "biznes-i-meropriyatiya": {
    icon: Building2,
    bgClass: "bg-mint-soft/80",
    iconClass: "text-blue-soft-dark",
  },
  "gelevye-kompozicii": {
    icon: Sparkles,
    bgClass: "bg-gold-muted-light/50",
    iconClass: "text-gold-muted-dark",
  },
};

export function getCategoryVisual(slug: string): CategoryVisual {
  return CATEGORY_VISUALS[slug] ?? DEFAULT;
}
