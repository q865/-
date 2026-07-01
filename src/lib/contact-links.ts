export function buildTelegramOrderUrl(telegramUrl: string, productName?: string) {
  const base = telegramUrl.replace(/\/$/, "");
  if (!productName) return base;

  const text = encodeURIComponent(
    `Здравствуйте! Хочу заказать: ${productName}`,
  );
  return `${base}?text=${text}`;
}

export function buildTelUrl(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.startsWith("7") ? digits : `7${digits}`}`;
}
