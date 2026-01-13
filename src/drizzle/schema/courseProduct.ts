import { relations } from "drizzle-orm";
import { pgTable, text, uuid, primaryKey } from "drizzle-orm/pg-core";
import { id, createdAt, updatedAt } from "../schemaHelpers";
import { CourseTable } from "./course";
import { ProductTable } from "./product";

export const CourseProductTable = pgTable(
  "course_products",
  {
    courseId: uuid()
      .notNull()
      .references(() => CourseTable.id, { onDelete: "restrict" }),
    productId: uuid()
      .notNull()
      .references(() => ProductTable.id, { onDelete: "cascade" }),
    createdAt,
    updatedAt,
  },
  (table) => [primaryKey({ columns: [table.courseId, table.productId] })]
);

export const CourseProductRelationships = relations(
  CourseProductTable,
  ({ one }) => ({
    course: one(CourseTable, {
      fields: [CourseProductTable.courseId],
      references: [CourseTable.id],
    }),
    product: one(ProductTable, {
      fields: [CourseProductTable.productId],
      references: [ProductTable.id],
    }),
  })
);
