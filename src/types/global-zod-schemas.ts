import { z } from "zod";
import { fromError } from "zod-validation-error";



export function validateImageFiles() {
  const maxUploadSize = 2 * 1024 * 1024; // 2MB
  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/jpg",
  ];

  return z
    .array(z.instanceof(File))
    .max(8, "You can only upload up to 8 images")
    .refine(
      (files) => files.every((file) => file.size <= maxUploadSize),
      "Each file must be less than 2MB"
    )
    .refine(
      (files) =>
        files.every((file) =>
          acceptedFileTypes.some((type) => file.type.startsWith(type))
        ),
      "File must be a valid image type (JPEG, PNG, WebP, GIF, JPG)"
    );
}

export function validateImageFile() {
  const maxUploadSize = 1024 * 1024 * 2;
  const acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/jpg",
  ];
  return z
    .instanceof(File)
    .refine((file) => {
      return file.size <= maxUploadSize;
    }, `Image size must be less than 2 MB`)
    .refine((file) => {
      return acceptedFileTypes.includes(file.type);
    }, "Image must be a valid image type (JPEG, PNG, WebP, GIF, JPG)");
}

export function validateWithZodSchema<T>(
  schema: z.ZodType<T>,
  data: unknown
): T | { error: boolean; message: string } {
  const result = schema.safeParse(data);

  if (!result.success) {
    const errors = fromError(result.error);
    return { error: true, message: errors.toString() };
  }
  return result.data;
}


