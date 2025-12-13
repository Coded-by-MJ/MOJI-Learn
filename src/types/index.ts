import { Session, User } from "better-auth";
import { userRoleEnum } from "@/drizzle/schema/auth";

export type SessionWithUserType = {
  session: Session;
  user: AuthUserType;
};

export type AuthUserType = User & {
  banned: boolean;
  banReason: string | null;
  banExpiresAt: Date | null;
  role: (typeof userRoleEnum.enumValues)[number];
  deletedAt: Date | null;
};

export type ActionDataType = {
  error: boolean;
  message: string;
};