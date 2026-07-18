import {
  Baby,
  Balloon,
  Box,
  Building2,
  Cake,
  Flower2,
  Gem,
  Gift,
  Heart,
  PartyPopper,
  Ribbon,
  Sparkles,
  Star,
  Wind,
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

/** Точное совпадение по slug. */
export const CATEGORY_VISUALS: Record<string, CategoryVisual> = {
  "gelevye-kompozicii": {
    icon: Flower2,
    bgClass: "bg-gold-muted-light/50",
    iconClass: "text-gold-muted-dark",
  },
  "gender-pati": {
    icon: PartyPopper,
    bgClass: "bg-rose-dusty-light/70",
    iconClass: "text-rose-dusty-dark",
  },
  vypiska: {
    icon: Baby,
    bgClass: "bg-blue-soft-light/80",
    iconClass: "text-blue-soft-dark",
  },
  "dni-rozhdeniya": {
    icon: Cake,
    bgClass: "bg-yellow-soft/70",
    iconClass: "text-yellow-soft-dark",
  },
  svadby: {
    icon: Ribbon,
    bgClass: "bg-lavender-soft/80",
    iconClass: "text-rose-dusty-dark",
  },
  "biznes-i-meropriyatiya": {
    icon: Building2,
    bgClass: "bg-mint-soft/80",
    iconClass: "text-blue-soft-dark",
  },
  // Категории из админки (товарные типы)
  "bolshoe-serdtse-80-90sm": {
    icon: Heart,
    bgClass: "bg-rose-dusty-light/75",
    iconClass: "text-rose-dusty-dark",
  },
  "shar-babl": {
    icon: Balloon,
    bgClass: "bg-blue-soft-light/75",
    iconClass: "text-blue-soft-dark",
  },
  "steklyannyy-shar": {
    icon: Gem,
    bgClass: "bg-mint-soft/85",
    iconClass: "text-blue-soft-dark",
  },
  "gelievyy-vozdushnyy-shar": {
    icon: Wind,
    bgClass: "bg-yellow-soft/65",
    iconClass: "text-yellow-soft-dark",
  },
  "den-rozhdeniya": {
    icon: Cake,
    bgClass: "bg-yellow-soft/70",
    iconClass: "text-yellow-soft-dark",
  },
  "korobka-syurpriz-s-sharami": {
    icon: Gift,
    bgClass: "bg-lavender-soft/75",
    iconClass: "text-rose-dusty-dark",
  },
};

type KeywordRule = {
  test: (text: string) => boolean;
  visual: CategoryVisual;
};

function has(text: string, ...parts: string[]) {
  return parts.some((part) => text.includes(part));
}

const KEYWORD_RULES: KeywordRule[] = [
  {
    test: (t) => has(t, "gender", "гендер"),
    visual: CATEGORY_VISUALS["gender-pati"],
  },
  {
    test: (t) => has(t, "vypiska", "выписк", "roddom", "роддом", "malysh", "малыш"),
    visual: CATEGORY_VISUALS.vypiska,
  },
  {
    test: (t) => has(t, "svadb", "свадьб", "wedding"),
    visual: CATEGORY_VISUALS.svadby,
  },
  {
    test: (t) => has(t, "dni-rozhden", "den-rozhden", "день рожд", "birthday", "birth"),
    visual: CATEGORY_VISUALS["dni-rozhdeniya"],
  },
  {
    test: (t) => has(t, "biznes", "бизнес", "korporativ", "корпоратив", "meropriyat", "мероприят"),
    visual: CATEGORY_VISUALS["biznes-i-meropriyatiya"],
  },
  {
    test: (t) => has(t, "serdce", "сердц", "heart"),
    visual: {
      icon: Heart,
      bgClass: "bg-rose-dusty-light/75",
      iconClass: "text-rose-dusty-dark",
    },
  },
  {
    test: (t) => has(t, "korobk", "коробк", "syurpriz", "сюрприз", "box", "gift"),
    visual: {
      icon: Gift,
      bgClass: "bg-lavender-soft/75",
      iconClass: "text-rose-dusty-dark",
    },
  },
  {
    test: (t) => has(t, "babl", "бабл", "bubble"),
    visual: {
      icon: Balloon,
      bgClass: "bg-blue-soft-light/75",
      iconClass: "text-blue-soft-dark",
    },
  },
  {
    test: (t) => has(t, "stekl", "стекл", "glass"),
    visual: {
      icon: Gem,
      bgClass: "bg-mint-soft/85",
      iconClass: "text-blue-soft-dark",
    },
  },
  {
    test: (t) => has(t, "geliev", "гелиев", "helium", "vozdush", "воздуш"),
    visual: {
      icon: Wind,
      bgClass: "bg-yellow-soft/65",
      iconClass: "text-yellow-soft-dark",
    },
  },
  {
    test: (t) => has(t, "cifr", "цифр", "number", "chislo", "числ"),
    visual: {
      icon: Star,
      bgClass: "bg-gold-muted-light/65",
      iconClass: "text-gold-muted-dark",
    },
  },
  {
    test: (t) => has(t, "fontan", "фонтан", "fountain"),
    visual: {
      icon: Sparkles,
      bgClass: "bg-lavender-soft/70",
      iconClass: "text-rose-dusty-dark",
    },
  },
  {
    test: (t) => has(t, "kompozic", "композиц", "nabor", "набор", "buket", "букет"),
    visual: CATEGORY_VISUALS["gelevye-kompozicii"],
  },
  {
    test: (t) => has(t, "arka", "арка", "fotozon", "фотозон"),
    visual: {
      icon: Ribbon,
      bgClass: "bg-rose-dusty-light/60",
      iconClass: "text-rose-dusty-dark",
    },
  },
];

/** Разные иконки для неизвестных категорий — без повторов подряд. */
const FALLBACK_POOL: CategoryVisual[] = [
  { icon: Balloon, bgClass: "bg-blue-soft-light/70", iconClass: "text-blue-soft-dark" },
  { icon: Gift, bgClass: "bg-lavender-soft/75", iconClass: "text-rose-dusty-dark" },
  { icon: Star, bgClass: "bg-yellow-soft/65", iconClass: "text-yellow-soft-dark" },
  { icon: Gem, bgClass: "bg-mint-soft/80", iconClass: "text-blue-soft-dark" },
  { icon: Box, bgClass: "bg-gold-muted-light/55", iconClass: "text-gold-muted-dark" },
  { icon: Wind, bgClass: "bg-blue-soft-light/60", iconClass: "text-blue-soft-dark" },
  { icon: Flower2, bgClass: "bg-rose-dusty-light/55", iconClass: "text-rose-dusty-dark" },
  { icon: Ribbon, bgClass: "bg-lavender-soft/70", iconClass: "text-rose-dusty-dark" },
];

function normalize(text: string) {
  return text.toLowerCase().replace(/ё/g, "е");
}

function hashSlug(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash + slug.charCodeAt(i) * (i + 1)) % 2147483647;
  }
  return hash;
}

export function getCategoryVisual(slug: string, name?: string): CategoryVisual {
  if (CATEGORY_VISUALS[slug]) {
    return CATEGORY_VISUALS[slug];
  }

  const text = normalize(`${slug} ${name ?? ""}`);

  for (const rule of KEYWORD_RULES) {
    if (rule.test(text)) {
      return rule.visual;
    }
  }

  return FALLBACK_POOL[hashSlug(slug) % FALLBACK_POOL.length] ?? DEFAULT;
}
