import { db } from "@/drizzle/db"
import {
  CourseSectionTable,
  CourseTable,
  LessonStatus,
  LessonTable,
  UserCourseAccessTable,
} from "@/drizzle/schema"
import { getUserCourseAccessUserTag } from "@/features/courses/db/cache/userCourseAccess"
import { wherePublicCourseSections } from "@/features/courseSections/permissions"
import { and, eq, or } from "drizzle-orm"
import { getLessonIdTag } from "../db/cache"
import { updateTag } from "next/cache"
import { AuthUserType } from "@/types"

export function canCreateLessons(adminUser: AuthUserType | null) {
  return adminUser ? true : false
}

export function canUpdateLessons(adminUser: AuthUserType | null) {
  return adminUser ? true : false
}

export function canDeleteLessons(adminUser: AuthUserType | null) {
  return adminUser ? true : false
}

export async function canViewLesson(
  {
    adminUser,
    userId,
  }: {
    userId: string | undefined
    adminUser: AuthUserType | null
  },
  lesson: { id: string; status: LessonStatus }
) {
  "use cache"
  if (adminUser ? true : false || lesson.status === "preview") return true
  if (userId == null || lesson.status === "private") return false

  updateTag(getUserCourseAccessUserTag(userId))
  updateTag(getLessonIdTag(lesson.id))

  const [data] = await db
    .select({ courseId: CourseTable.id })
    .from(UserCourseAccessTable)
    .leftJoin(CourseTable, eq(CourseTable.id, UserCourseAccessTable.courseId))
    .leftJoin(
      CourseSectionTable,
      and(
        eq(CourseSectionTable.courseId, CourseTable.id),
        wherePublicCourseSections
      )
    )
    .leftJoin(
      LessonTable,
      and(eq(LessonTable.sectionId, CourseSectionTable.id), wherePublicLessons)
    )
    .where(
      and(
        eq(LessonTable.id, lesson.id),
        eq(UserCourseAccessTable.userId, userId)
      )
    )
    .limit(1)

  return data != null && data.courseId != null
}

export const wherePublicLessons = or(
  eq(LessonTable.status, "public"),
  eq(LessonTable.status, "preview")
)