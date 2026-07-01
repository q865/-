import Image, { type ImageProps } from "next/image";
import { IMAGE_BLUR_DATA_URL } from "@/lib/stock-images";
import { cn, isPlaceholderImage } from "@/lib/utils";

type ProductImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

export function ProductImage({
  src,
  alt,
  className,
  fill,
  sizes,
  priority,
  ...props
}: ProductImageProps) {
  const isLocalUpload = src.startsWith("/uploads/");
  const isRemote = src.startsWith("http");
  const useBlur = isRemote || (!isLocalUpload && !isPlaceholderImage(src));

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes ?? (fill ? "(max-width: 640px) 50vw, 25vw" : undefined)}
      priority={priority}
      placeholder={useBlur ? "blur" : undefined}
      blurDataURL={useBlur ? IMAGE_BLUR_DATA_URL : undefined}
      unoptimized={isLocalUpload}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}
