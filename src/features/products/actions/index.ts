"use server"

import { z } from "zod"
import {
  insertProduct,
  updateProduct as updateProductDb,
  deleteProduct as deleteProductDb,
    } from "@/features/products/db"
import { redirect } from "next/navigation"
import { getAdminUser } from "@/features/users/actions"
import {
  canCreateProducts,
  canDeleteProducts,
  canUpdateProducts,
} from "../permissions"
import { productSchema } from "../zod-schemas"

export async function createProduct(unsafeData: z.infer<typeof productSchema>) {
  const { success, data } = productSchema.safeParse(unsafeData)

  if (!success || !canCreateProducts(await getAdminUser())) {
    return { error: true, message: "There was an error creating your product" }
  }

  await insertProduct(data)

  redirect("/admin/products")
}

export async function updateProduct(
  id: string,
  unsafeData: z.infer<typeof productSchema>
) {
  const { success, data } = productSchema.safeParse(unsafeData)

  if (!success || !canUpdateProducts(await getAdminUser())) {
    return { error: true, message: "There was an error updating your product" }
  }

  await updateProductDb(id, data)

  redirect("/admin/products")
}

export async function deleteProduct(id: string) {
  if (!canDeleteProducts(await getAdminUser())) {
    return { error: true, message: "Error deleting your product" }
  }

  await deleteProductDb(id)

  return { error: false, message: "Successfully deleted your product" }
}