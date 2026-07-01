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
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-neutral-border bg-neutral-muted">
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
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl border bg-neutral-muted transition ${
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
      ) : null}
    </div>
  );
}
