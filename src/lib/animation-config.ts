/** Длительности анимаций (мс) */
export const MOTION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500,
  float: 6000,
} as const;

/** Кривые сглаживания */
export const MOTION_EASE = {
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

/** Задержка между элементами в stagger-сетке (мс) */
export const STAGGER_STEP_MS = 70;

/** Максимальная задержка stagger, чтобы не ждать слишком долго */
export const STAGGER_MAX_DELAY_MS = 420;

/** Mobile (<sm): быстрее появление карточек */
export const STAGGER_STEP_MS_MOBILE = 40;
export const STAGGER_MAX_DELAY_MS_MOBILE = 200;
export const FADE_IN_MAX_DELAY_MS_MOBILE = 80;

/** Смещение при fade-in-up (px) */
export const FADE_IN_OFFSET_PX = 20;

/** Подъём карточки при hover (px) */
export const CARD_HOVER_LIFT_PX = 5;
