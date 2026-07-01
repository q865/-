"use client";

import { useState } from "react";
import { ProductImage } from "@/components/product-image";

export function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-neutral-border/80 bg-neutral-muted shadow-float">
        <ProductImage
          src={activeImage}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 ? (
        <div className="space-y-2">
          <p className="text-xs text-muted sm:sr-only">Выберите фото</p>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap sm:gap-3 sm:overflow-x-auto sm:pb-1 sm:[-ms-overflow-style:none] sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative aspect-square w-[4.5rem] shrink-0 overflow-hidden rounded-2xl border bg-neutral-muted transition-all duration-300 sm:w-20 ${
                activeIndex === index
                  ? "border-rose-dusty ring-2 ring-rose-dusty-light"
                  : "border-neutral-border hover:border-rose-dusty-light"
              }`}
              aria-label={`Фото ${index + 1}`}
              aria-current={activeIndex === index}
            >
              <ProductImage src={image} alt="" fill className="object-cover" sizes="120px" />
            </button>
          ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
