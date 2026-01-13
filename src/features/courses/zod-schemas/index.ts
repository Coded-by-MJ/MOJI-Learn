import { z } from "zod";

export const courseSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
