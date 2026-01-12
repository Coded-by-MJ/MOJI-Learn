"use server"

import { lessonSchema , LessonType} from "../zod-schemas"
import {
  canCreateLessons,
  canDeleteLessons,
  canUpdateLessons,
} from "../permissions"
import {
  getNextCourseLessonOrder,
  insertLesson,
  updateLesson as updateLessonDb,
  deleteLesson as deleteLessonDb,
  updateLessonOrders as updateLessonOrdersDb,
} from "../db"
import { getAdminUser } from "@/features/users/actions"
import { validateWithZodSchema } from "@/types/global-zod-schemas"

export async function createLesson(unsafeData: LessonType) {
  const data = validateWithZodSchema(lessonSchema, unsafeData)
  if ("error" in data) {
    return data;
  }

  if (!canCreateLessons(await getAdminUser())) {
    return { error: true, message: "There was an error creating your lesson" }
  }

  const order = await getNextCourseLessonOrder(data.sectionId)

  await insertLesson({ ...data, order })

  return { error: false, message: "Successfully created your lesson" }
}

export async function updateLesson(
  id: string,
  unsafeData: LessonType
) {
  const data = validateWithZodSchema(lessonSchema, unsafeData)
  if ("error" in data) {
    return data;
  }

  if (!canUpdateLessons(await getAdminUser())) {
    return { error: true, message: "There was an error updating your lesson" }
  }

  await updateLessonDb(id, data)

  return { error: false, message: "Successfully updated your lesson" }
}

export async function deleteLesson(id: string) {
  if (!canDeleteLessons(await getAdminUser())) {
    return { error: true, message: "Error deleting your lesson" }
  }

  await deleteLessonDb(id)

  return { error: false, message: "Successfully deleted your lesson" }
}

export async function updateLessonOrders(lessonIds: string[]) {
  if (lessonIds.length === 0 || !canUpdateLessons(await getAdminUser())) {
    return { error: true, message: "Error reordering your lessons" }
  }

  await updateLessonOrdersDb(lessonIds)

  return { error: false, message: "Successfully reordered your lessons" }
}