import { updateTag } from "next/cache";
import { getGlobalTag, getIdTag } from "@/lib/dataCache";

export function getCourseGlobalTag() {
  return getGlobalTag("courses");
}

export function getCourseIdTag(courseId: string) {
  return getIdTag("courses", courseId);
}

export function revalidateCourseCache(courseId: string) {
  updateTag(getCourseGlobalTag());
  updateTag(getCourseIdTag(courseId));
}
