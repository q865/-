#!/usr/bin/env node
/**
 * Скачивает фото портфолио в public/uploads/portfolio для seed.
 * Запуск: node scripts/download-portfolio-images.mjs
 */
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "uploads", "portfolio");

/** slug → URL (Pexels/Unsplash, тематика шаров и праздников). */
const PORTFOLIO_IMAGES = {
  "nabor-gender-pati": "https://images.pexels.com/photos/38257445/pexels-photo-38257445.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "vypiska-nebesnaya-nezhnost": "https://images.pexels.com/photos/3609498/pexels-photo-3609498.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "fontan-iz-sharov": "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "arka-svadba": "https://images.pexels.com/photos/931177/pexels-photo-931177.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "cifra-den-rozhdeniya": "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "oformlenie-vitriny-magazina": "https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "otkrytie-magazina": "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "korporativnoe-oformlenie": "https://images.pexels.com/photos/265906/pexels-photo-265906.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "gender-box-surprise": "https://images.pexels.com/photos/31779567/pexels-photo-31779567.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "oblako-sharov": "https://images.pexels.com/photos/1708601/pexels-photo-1708601.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "svadebnaya-fotozona": "https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "serdtse-iz-sharov": "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "vypiska-malysh-uzhe-tut": "https://images.pexels.com/photos/3609498/pexels-photo-3609498.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "fountain-den-rozhdeniya": "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1200",
};

async function main() {
  await mkdir(outDir, { recursive: true });

  for (const [slug, url] of Object.entries(PORTFOLIO_IMAGES)) {
    const filename = `${slug}.jpg`;
    const filepath = path.join(outDir, filename);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Skip ${slug}: HTTP ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      await writeFile(filepath, buffer);
      console.log(`Saved ${filename}`);
    } catch (error) {
      console.warn(`Skip ${slug}:`, error.message);
    }
  }

  console.log("Done.");
}

main();
