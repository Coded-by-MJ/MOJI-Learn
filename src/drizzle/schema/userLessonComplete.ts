import { pgTable } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "../schemaHelpers";
import { LessonTable } from "./lesson";
import { UserTable } from "./auth";
import { uuid ,text, primaryKey} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const UserLessonCompleteTable = pgTable(
  "user_lesson_complete",
  {
    lessonId: uuid()
      .notNull()
      .references(() => LessonTable.id, { onDelete: "restrict" }),
    userId: text()
      .notNull()
      .references(() => UserTable.id, { onDelete: "restrict" }),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.lessonId, table.userId] })]
);

export const UserLessonCompleteRelationships = relations(
  UserLessonCompleteTable,
  ({ one }) => ({
    lesson: one(LessonTable, {
      fields: [UserLessonCompleteTable.lessonId],
      references: [LessonTable.id],
    }),
    user: one(UserTable, {
      fields: [UserLessonCompleteTable.userId],
      references: [UserTable.id],
    }),
  })
);
