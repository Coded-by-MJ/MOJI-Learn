import { CourseSectionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { AuthUserType } from "@/types";

export const canCreateCourseSections = async (
  adminUser: AuthUserType | null
) => {
  return adminUser ? true : false;
};
export const canDeleteCourseSections = async (
  adminUser: AuthUserType | null
) => {
  return adminUser ? true : false;
};
export const canUpdateCourseSections = async (
  adminUser: AuthUserType | null
) => {
  return adminUser ? true : false;
};

export const wherePublicCourseSections = eq(
  CourseSectionTable.status,
  "public"
);
