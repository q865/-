import Image, { type ImageProps } from "next/image";
import { isPlaceholderImage } from "@/lib/utils";

type ProductImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

export function ProductImage({ src, alt, ...props }: ProductImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      unoptimized={!isPlaceholderImage(src) && src.startsWith("/uploads/")}
      {...props}
    />
  );
}
