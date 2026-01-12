import { getGlobalTag, getIdTag, getUserTag } from "@/lib/dataCache";
import { revalidateTag, updateTag } from "next/cache";

export function getPurchaseGlobalTag() {
  return getGlobalTag("purchases");
}

export function getPurchaseIdTag(id: string) {
  return getIdTag("purchases", id);
}

export function getPurchaseUserTag(userId: string) {
  return getUserTag("purchases", userId);
}

export function revalidatePurchaseCache({
  id,
  userId,
  isServer = true,
}: {
  id: string;
  userId: string;
  isServer?: boolean;
}) {
  if (isServer) {
    updateTag(getPurchaseGlobalTag());
    updateTag(getPurchaseIdTag(id));
    updateTag(getPurchaseUserTag(userId));
  }
  else {
    revalidateTag(getPurchaseGlobalTag(), "max");
    revalidateTag(getPurchaseIdTag(id), "max");
    revalidateTag(getPurchaseUserTag(userId), "max");
  }
}
