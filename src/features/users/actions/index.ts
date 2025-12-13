"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { userRoleEnum } from "@/drizzle/schema/auth";
import { cacheTag } from "next/cache";
import { getUserIdTag } from "@/features/users/db/cache";
import type { SessionWithUserType } from "@/types";

export const getAuthUserWithRedirect =
  async (): Promise<SessionWithUserType | null> => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      redirect("/sign-in");
    }
    return session as unknown as SessionWithUserType;
  };

// --------------------------------------------
// Non-cached function (can use headers())
// --------------------------------------------
export const fetchSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session as unknown as SessionWithUserType;
};

// --------------------------------------------
// Cached function – must NOT call headers()
// --------------------------------------------
export const getAuthUser = async (session: SessionWithUserType | null) => {
  "use cache";

  if (!session) return null;

  if (session.user?.banned) {
    return null;
  }

  cacheTag(getUserIdTag(session.user.id));
  return session.user;
};

export const getAuthUserServer = async () => {
  const session = await fetchSession(); // get dynamic data OUTSIDE cached fn
  return getAuthUser(session); // pass into cached fn
};

export const getAdminUser = async () => {
  const user = await getAuthUserServer();

  if (user?.role === userRoleEnum.enumValues[0]) {
    return user;
  }
  return null;
};
