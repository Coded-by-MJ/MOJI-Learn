import { revalidateTag } from "next/cache";
import { getGlobalTag, getIdTag } from "@/lib/dataCache";

export function getUsersGlobalTag() {
  return getGlobalTag("users");
}

export function getUserIdTag(userId: string) {
  return getIdTag("users", userId);
}

export function revalidateUserCache(userId: string) {
  revalidateTag(getUsersGlobalTag(), "max");
  revalidateTag(getUserIdTag(userId), "max");
}
