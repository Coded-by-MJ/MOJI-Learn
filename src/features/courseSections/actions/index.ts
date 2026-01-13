"use server"

import { z } from "zod"
import { getAdminUser } from "@/features/users/actions"
import { sectionSchema } from "../zod-schemas"
import {
  canCreateCourseSections,
  canDeleteCourseSections,
  canUpdateCourseSections,
} from "../permissions"
import {
  getNextCourseSectionOrder,
  insertSection,
  updateSection as updateSectionDb,
  deleteSection as deleteSectionDb,
  updateSectionOrders as updateSectionOrdersDb,
} from "../db"
import { validateWithZodSchema } from "@/types/global-zod-schemas"

export async function createSection(
  courseId: string,
  unsafeData: z.infer<typeof sectionSchema>
) {
  const data = validateWithZodSchema(sectionSchema, unsafeData)
  if ("error" in data) {
    return data;
  }

  if (!canCreateCourseSections(await getAdminUser())) {
    return { error: true, message: "There was an error creating your section" }
  }

  const order = await getNextCourseSectionOrder(courseId)

  await insertSection({ ...data, courseId, order })

  return { error: false, message: "Successfully created your section" }
}

export async function updateSection(
  id: string,
  unsafeData: z.infer<typeof sectionSchema>
) {
  const { success, data } = sectionSchema.safeParse(unsafeData)

  if (!success || !canUpdateCourseSections(await getAdminUser())) {
    return { error: true, message: "There was an error updating your section" }
  }

  await updateSectionDb(id, data)

  return { error: false, message: "Successfully updated your section" }
}

export async function deleteSection(id: string) {
  if (!canDeleteCourseSections(await getAdminUser())) {
    return { error: true, message: "Error deleting your section" }
  }

  await deleteSectionDb(id)

  return { error: false, message: "Successfully deleted your section" }
}

export async function updateSectionOrders(sectionIds: string[]) {
  if (
    sectionIds.length === 0 ||
    !canUpdateCourseSections(await getAdminUser())
  ) {
    return { error: true, message: "Error reordering your sections" }
  }

  await updateSectionOrdersDb(sectionIds)

  return { error: false, message: "Successfully reordered your sections" }
}