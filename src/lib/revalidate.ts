import { revalidatePath } from "next/cache";

/** Инвалидирует публичные страницы после изменения каталога. */
export function revalidatePublicCatalog(productSlug?: string) {
  revalidatePath("/");
  revalidatePath("/catalog");

  if (productSlug) {
    revalidatePath(`/product/${productSlug}`);
  }
}

/** Инвалидирует контент, зависящий от настроек сайта. */
export function revalidateSiteContent() {
  revalidatePath("/");
  revalidatePath("/contacts");
  revalidatePath("/how-to-order");
}
