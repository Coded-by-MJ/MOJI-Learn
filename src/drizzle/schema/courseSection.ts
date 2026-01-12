import { relations } from "drizzle-orm";
import { pgTable, text, uuid, primaryKey, pgEnum, integer } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { CourseTable } from "./course";
import { LessonTable } from "./lesson";


export const courseSectionStatuses = ["public", "private"] as const
export type CourseSectionStatus = (typeof courseSectionStatuses)[number]
export const courseSectionStatusEnum = pgEnum("course_section_status", courseSectionStatuses);

export const CourseSectionTable = pgTable("course_sections", {
  id,
  courseId: uuid().notNull().references(() => CourseTable.id, { onDelete: "cascade" }),
  name: text().notNull(),
  order: integer().notNull(),
  status: courseSectionStatusEnum().notNull().default("private"),
  createdAt,
  updatedAt,
});   

export const CourseSectionRelationships = relations(CourseSectionTable, ({ one, many }) => ({
  course: one(CourseTable, {
    fields: [CourseSectionTable.courseId],
    references: [CourseTable.id],
  }),
  lessons: many(LessonTable),
}));