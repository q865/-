import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { requireAdminSession } from "@/lib/api/auth-guard";
import { jsonError, jsonOk } from "@/lib/api/response";
import { buildUploadFilename, UploadValidationError, validateImageUpload } from "@/lib/upload";

export async function POST(request: Request) {
  const { unauthorized } = await requireAdminSession();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("Файл не передан", 400);
    }

    const buffer = await validateImageUpload(file);
    const ext = path.extname(file.name).toLowerCase();
    const filename = buildUploadFilename(ext);
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    return jsonOk({ url: `/uploads/${filename}` }, 201);
  } catch (error) {
    if (error instanceof UploadValidationError) {
      return jsonError(error.message, 400);
    }

    console.error("[upload]", error);
    return jsonError("Не удалось загрузить файл", 500);
  }
}
