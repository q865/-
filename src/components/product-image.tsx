"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/stock-images";
import { cn, isPlaceholderImage } from "@/lib/utils";

type ProductImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  /** Запасное изображение при ошибке загрузки */
  fallbackSrc?: string;
};

export function ProductImage({
  src,
  alt,
  fallbackSrc,
  className,
  fill,
  sizes,
  priority,
  ...props
}: ProductImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const currentSrc = failedSrc === src && fallbackSrc ? fallbackSrc : src;

  const isRemote = currentSrc.startsWith("http");
  const isPortfolio = currentSrc.startsWith("/uploads/portfolio/");
  const isLocalUpload = currentSrc.startsWith("/uploads/") && !isPortfolio;
  const useBlur = isRemote || (!isLocalUpload && !isPlaceholderImage(currentSrc));

  function handleError() {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setFailedSrc(src);
    }
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      sizes={sizes ?? (fill ? "(max-width: 640px) 50vw, 25vw" : undefined)}
      priority={priority}
      placeholder={useBlur ? "blur" : undefined}
      blurDataURL={useBlur ? IMAGE_BLUR_DATA_URL : undefined}
      unoptimized={isLocalUpload}
      onError={handleError}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}
