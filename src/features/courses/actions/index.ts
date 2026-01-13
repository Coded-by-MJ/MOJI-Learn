"use server";

import { courseSchema, CourseSchemaType } from "../zod-schemas";
import { validateWithZodSchema } from "@/types/global-zod-schemas";
import { insertCourse, updateCourseDB, deleteCourseDB } from "../db";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/features/users/actions";
import { canCreateCourses, canUpdateCourses, canDeleteCourses } from "../permissions";

export const createCourse = async (rawData: CourseSchemaType) => {
  const data = validateWithZodSchema(courseSchema, rawData);
  if ("error" in data) {
    return data;
  }

  if (!canCreateCourses(await getAdminUser())) {
    return {
      error: true,
      message: "You are not authorized to create a course.",
    };
  }

  const course = await insertCourse(data);
  redirect(`/admin/courses/${course.id}/edit`);
};

export const updateCourse = async (
  courseId: string,
  rawData: CourseSchemaType
) => {
  const data = validateWithZodSchema(courseSchema, rawData);
  if ("error" in data) {
    return data;
  }
  if (!canUpdateCourses(await getAdminUser())) {
    return {
      error: true,
      message: "You are not authorized to update a course.",
    };
  }

  await updateCourseDB(courseId, data);
  return {
    error: false,
    message: "Course updated successfully.",
  };
};

export const deleteCourse = async (courseId: string) => {
  if (!canDeleteCourses(await getAdminUser())) {
    return {
      error: true,
      message: "You are not authorized to delete a course.",
    };
  }
  await deleteCourseDB(courseId);
  return {
    error: false,
    message: "Course deleted successfully.",
  };
};
