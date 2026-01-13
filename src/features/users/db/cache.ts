import { updateTag } from "next/cache";
import { getGlobalTag, getIdTag } from "@/lib/dataCache";

export function getUsersGlobalTag() {
  return getGlobalTag("users");
}

export function getUserIdTag(userId: string) {
  return getIdTag("users", userId);
}

export function revalidateUserCache(userId: string) {
  updateTag(getUsersGlobalTag());
  updateTag(getUserIdTag(userId));
}
