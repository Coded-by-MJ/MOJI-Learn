import { getGlobalTag, getIdTag } from "@/lib/dataCache"
import { updateTag } from "next/cache"

export function getProductGlobalTag() {
  return getGlobalTag("products")
}

export function getProductIdTag(id: string) {
  return getIdTag("products", id)
}

export function revalidateProductCache(id: string) {
  updateTag(getProductGlobalTag())
  updateTag(getProductIdTag(id))
}