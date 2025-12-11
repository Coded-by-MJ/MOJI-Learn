"use client";

import { userRoleEnum } from "@/drizzle/schema/auth";
import { authClient, UserSession } from "@/lib/auth-client";

type SignedInProps = {
  children: React.ReactNode | ((data: UserSession) => React.ReactNode);
};

export function SignedIn({ children }: SignedInProps) {
  const { data } = authClient.useSession();

  if (!data) return null;

  // if children is a function, pass data
  if (typeof children === "function") {
    return <>{(children as (data: UserSession) => React.ReactNode)(data)}</>;
  }

  return <>{children}</>;
}

type SignedOutProps = {
  children: React.ReactNode;
};

export function SignedOut({ children }: SignedOutProps) {
  const { data } = authClient.useSession();

  if (data) return null;

  return <>{children}</>;
}

type AdminAccessProps = {
  children: React.ReactNode;
};

export function AdminAccess({ children }: AdminAccessProps) {
  const { data } = authClient.useSession();

  if (data?.user?.role && data.user.role === userRoleEnum.enumValues[0]) {
    return <>{children}</>;
  }
  return null;
}
