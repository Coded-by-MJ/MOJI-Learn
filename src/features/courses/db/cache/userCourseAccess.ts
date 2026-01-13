import { revalidateTag, updateTag } from "next/cache";
import { getGlobalTag, getIdTag, getUserTag } from "@/lib/dataCache";
import { truncate } from "fs/promises";

export function getUserCourseAccessGlobalTag() {
  return getGlobalTag("userCourseAccess");
}

export function getUserCourseAccessIdTag({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) {
  return getIdTag("userCourseAccess", `course:${courseId}-user:${userId}`);
}

export function getUserCourseAccessUserTag(userId: string) {
  return getUserTag("userCourseAccess", userId);
}

export function revalidateUserCourseAccessCache({
  userId,
  courseId,
  isServer = true,
}: {
  userId: string;
  courseId: string;
  isServer?: boolean;
}) {
  if (isServer) {
    updateTag(getUserCourseAccessGlobalTag());
    updateTag(getUserCourseAccessIdTag({ courseId, userId }));
    updateTag(getUserCourseAccessUserTag(userId));
  } else {
    revalidateTag(getUserCourseAccessGlobalTag(), "max");
    revalidateTag(getUserCourseAccessIdTag({ courseId, userId }), "max");
    revalidateTag(getUserCourseAccessUserTag(userId), "max");
  }
}
