import { getGlobalTag, getIdTag, getUserTag } from "@/lib/dataCache";
import { updateTag } from "next/cache";

export function getUserLessonCompleteGlobalTag() {
  return getGlobalTag("userLessonComplete");
}

export function getUserLessonCompleteIdTag({
  lessonId,
  userId,
}: {
  lessonId: string;
  userId: string;
}) {
  return getIdTag("userLessonComplete", `lesson:${lessonId}-user:${userId}`);
}

export function getUserLessonCompleteUserTag(userId: string) {
  return getUserTag("userLessonComplete", userId);
}

export function revalidateUserLessonCompleteCache({
  lessonId,
  userId,
}: {
  lessonId: string;
  userId: string;
}) {
  updateTag(getUserLessonCompleteGlobalTag());
  updateTag(getUserLessonCompleteIdTag({ lessonId, userId }));
  updateTag(getUserLessonCompleteUserTag(userId));
}
