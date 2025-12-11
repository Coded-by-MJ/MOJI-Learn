import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth"; // your better-auth instance
import { headers } from "next/headers";
import { UserRole } from "@/generated/prisma";
// import { routeAccessMap } from "./utils";

const privateRoutes = ["/list", "/profile", "/settings"];
const authRoutes = [
  "/forgot-password",
  "/reset-password",
  "/sign-in",
  "/sign-up",
];

// const roleRoutes: Record<string, string> = {
//   admin: "/admin",
//   teacher: "/teacher",
//   student: "/student",
//   parent: "/parent",
// };

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;
  const isPrivate = privateRoutes.some((route) => pathname.startsWith(route));
  const isAuth = authRoutes.some((route) => pathname.startsWith(route));

  // Not logged in → block private routes
  if (!session && isPrivate) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Prevent cross-role access

  // Allow otherwise
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)", "/"], // protect all pages except public
};
