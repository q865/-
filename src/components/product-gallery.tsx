"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const hasMany = images.length > 1;

  function go(delta: number) {
    setActiveIndex((current) => (current + delta + images.length) % images.length);
  }

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
        {hasMany ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/55"
              aria-label="Следующее фото"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
            <p className="absolute bottom-3 right-3 rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium text-white">
              {activeIndex + 1} / {images.length}
            </p>
          </>
        ) : null}
      </div>
      {hasMany ? (
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
                    ? "border-gold-muted ring-2 ring-gold-muted-light"
                    : "border-neutral-border hover:border-gold-muted-light"
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
