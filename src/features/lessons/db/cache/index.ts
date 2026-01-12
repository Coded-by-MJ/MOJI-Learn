import { updateTag } from "next/cache";
import { getCourseTag, getGlobalTag, getIdTag } from "@/lib/dataCache";

export function getLessonGlobalTag() {
  return getGlobalTag("lessons");
}

export function getLessonIdTag(lessonId: string) {
  return getIdTag("lessons", lessonId);
}

export function getLessonCourseTag(courseId: string) {
  return getCourseTag("lessons", courseId);
}

export function revalidateLessonCache({
  lessonId,
  courseId,
}: {
  lessonId: string;
  courseId: string;
}) {
  updateTag(getLessonGlobalTag());
  updateTag(getLessonIdTag(lessonId));
  updateTag(getLessonCourseTag(courseId));
}
