import { AuthUserType } from "@/types";

export const canCreateCourses = async (adminUser: AuthUserType | null) => {
  return adminUser ? true : false;
};
export const canDeleteCourses = async (adminUser: AuthUserType | null) => {
  return adminUser ? true : false;
};
export const canUpdateCourses = async (adminUser: AuthUserType | null) => {
  return adminUser ? true : false;
};
