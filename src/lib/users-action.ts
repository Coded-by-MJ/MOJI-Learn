"use server";

import { auth } from "./auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Route } from "next";
import { userRoleEnum } from "@/drizzle/schema/auth";

export const fetchSession = async () => {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({
      headers: headersList,
    });
    return session;
  } catch (error) {
    console.log("error fetching session", error);
    return null;
  }
};

export const getAuthUser = async () => {
  const session = await fetchSession();
  if (!session) {
    redirect("/sign-in");
  }
  if (session.user.banned) {
    throw new Error("Your account has been banned. Please contact support.");
  }
  return session;
};

export const getAdminUser = async () => {
  const { user } = await getAuthUser();

  if (user.role && user.role === userRoleEnum.enumValues[0]) {
    return user;
  }
  redirect("/sign-in");
};
