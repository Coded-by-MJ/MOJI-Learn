import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth"; // your better-auth instance
import { headers } from "next/headers";
import { userRoleEnum } from "@/drizzle/schema/auth";
import { env } from "@/data/env/server";
import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/next";
import { setUserCountryHeader } from "./lib/userCountryHeader";

const authRoutes = [
  "/forgot-password",
  "/reset-password",
  "/sign-in",
  "/sign-up",
];
const adminRoutes = ["/admin"];

const aj = arcjet({
  key: env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:MONITOR", "CATEGORY:PREVIEW"],
    }),
    slidingWindow({
      mode: "LIVE",
      interval: "1m",
      max: 100,
    }),
  ],
});

export async function proxy(request: NextRequest) {
  const decision = await aj.protect(
    env.TEST_IP_ADDRESS
      ? { ...request, ip: env.TEST_IP_ADDRESS, headers: request.headers }
      : request
  );
  if (decision.isDenied()) {
    return new NextResponse(null, { status: 403 });
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  // Logged in and accessing auth routes → redirect to home
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminRoute) {
    // Not logged in
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Logged in but not admin
    if (session.user.role !== userRoleEnum.enumValues[0]) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Logged in AND admin → allow
    return NextResponse.next();
  }

  if (!decision.ip.isVpn() && !decision.ip.isProxy()) {
    const headers = new Headers(request.headers);
    setUserCountryHeader(headers, decision.ip.country);
    console.log("country", decision.ip.country);
    return NextResponse.next({ request: { headers } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)", "/"], // protect all pages except public
};
