import { updateTag } from "next/cache";
import { getCourseTag, getGlobalTag, getIdTag } from "@/lib/dataCache";

export function getCourseSectionGlobalTag() {
  return getGlobalTag("courseSections");
}

export function getCourseSectionIdTag(courseSectionId: string) {
  return getIdTag("courseSections", courseSectionId);
}

export function getCourseSectionCourseTag(courseId: string) {
  return getCourseTag("courseSections", courseId);
}

export function revalidateCourseSectionCache({
  courseSectionId,
  courseId,
}: {
  courseSectionId: string
  courseId: string
}) {
  updateTag(getCourseSectionGlobalTag());
  updateTag(getCourseSectionIdTag(courseSectionId));
  updateTag(getCourseSectionCourseTag(courseId));
}
