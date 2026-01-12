import { AuthUserType } from "@/types";

export function canRefundPurchases(adminUser: AuthUserType | null) {
  return adminUser ? true : false;
}
