import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

function toAbsoluteUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${SITE_URL}${url.startsWith("/") ? url : `/${url}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  images,
}: {
  title: string;
  description: string;
  path: string;
  images?: Array<string | { url: string; width?: number; height?: number; alt?: string }>;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImages = (
    images?.length
      ? images
      : [{ url: "/brand/logo.png", width: 640, height: 640, alt: title }]
  ).map((image) =>
    typeof image === "string"
      ? { url: toAbsoluteUrl(image) }
      : { ...image, url: toAbsoluteUrl(image.url) },
  );

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "ru_RU",
      images: ogImages,
    },
  };
}
