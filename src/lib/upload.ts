import path from "path";
import {
  ALLOWED_IMAGE_EXTENSIONS,
  ALLOWED_IMAGE_TYPES,
  UPLOAD_MAX_BYTES,
} from "@/lib/constants/defaults";

export class UploadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadValidationError";
  }
}

/** Проверяет тип, размер и расширение загружаемого изображения. */
export async function validateImageUpload(file: File): Promise<Buffer> {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    throw new UploadValidationError("Допустимы только JPEG, PNG, WebP и GIF");
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.has(ext)) {
    throw new UploadValidationError("Недопустимое расширение файла");
  }

  const bytes = await file.arrayBuffer();
  if (bytes.byteLength > UPLOAD_MAX_BYTES) {
    throw new UploadValidationError("Файл слишком большой (максимум 5 МБ)");
  }

  if (bytes.byteLength === 0) {
    throw new UploadValidationError("Пустой файл");
  }

  return Buffer.from(bytes);
}

/** Безопасное имя файла: только разрешённое расширение, без пользовательского basename. */
export function buildUploadFilename(ext: string): string {
  const normalizedExt = ALLOWED_IMAGE_EXTENSIONS.has(ext) ? ext : ".jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2)}${normalizedExt}`;
}
