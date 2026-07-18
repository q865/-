type Bucket = {
  timestamps: number[];
};

const buckets = new Map<string, Bucket>();

/**
 * Простой in-memory rate limiter.
 * Для serverless/кластера лучше заменить на Redis или edge-лимит платформы.
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { timestamps: [] };

  bucket.timestamps = bucket.timestamps.filter((time) => now - time < windowMs);

  if (bucket.timestamps.length >= limit) {
    buckets.set(key, bucket);
    return false;
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return true;
}

/** IP клиента из заголовков прокси (Vercel, nginx и т.д.). */
export function getClientIp(request: Request): string {
  // nginx на VPS выставляет X-Real-IP сам — ему доверяем в первую очередь
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // Берём крайний справа hop — ближе к нашему edge, чем клиентский leftmost
    const hops = forwarded.split(",").map((part) => part.trim()).filter(Boolean);
    const trusted = hops.at(-1);
    if (trusted) return trusted;
  }

  return "unknown";
}
