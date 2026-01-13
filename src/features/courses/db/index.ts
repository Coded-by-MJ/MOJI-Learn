import { CourseTable } from "@/drizzle/schema/course";
import { db } from "@/drizzle/db";
import { revalidateCourseCache } from "./cache";
import { eq } from "drizzle-orm";

export const insertCourse = async (data: typeof CourseTable.$inferInsert) => {
  const [newCourse] = await db.insert(CourseTable).values(data).returning();

  if (!newCourse) {
    throw new Error("Failed to create course.");
  }

  revalidateCourseCache(newCourse.id);

  return newCourse;
};

export const updateCourseDB = async (
  courseId: string,
  data: typeof CourseTable.$inferInsert
) => {
  const [updatedCourse] = await db
    .update(CourseTable)
    .set(data)
    .where(eq(CourseTable.id, courseId))
    .returning();
  if (!updatedCourse) {
    throw new Error("Failed to update course.");
  }
  revalidateCourseCache(updatedCourse.id);
  return updatedCourse;
};

export const deleteCourseDB = async (courseId: string) => {
  const [deletedCourse] = await db
    .delete(CourseTable)
    .where(eq(CourseTable.id, courseId))
    .returning();
  if (!deletedCourse) {
    throw new Error("Failed to delete course.");
  }
  revalidateCourseCache(deletedCourse.id);
  return deletedCourse;
};
