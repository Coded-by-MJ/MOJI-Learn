import { ProductTable } from "@/drizzle/schema";
import { AuthUserType } from "@/types";
import { eq } from "drizzle-orm";

export function canCreateProducts(adminUser: AuthUserType | null) {
  return adminUser ? true : false;
}

export function canUpdateProducts(adminUser: AuthUserType | null) {
  return adminUser ? true : false;
}

export function canDeleteProducts(adminUser: AuthUserType | null) {
  return adminUser ? true : false;
}

export const wherePublicProducts = eq(ProductTable.status, "public");
