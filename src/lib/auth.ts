import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle/db";
import * as schema from "@/drizzle/schema";
import { admin, openAPI } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { sendResetPasswordEmailAction } from "@/lib/resendActions";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema,
  }),
  appName: "MOJI Learn",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmailAction({
        email: user.email,
        link: url,
        firstName: user.name.split(" ")[0],
      });
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
        required: false,
        defaultValue: "user",
        returned: true,
      },
    },
  },
  session: {
    // You're using prismaAdapter
    maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
    updateAge: 24 * 60 * 60, // Optional: refresh token age every 24 hours
    cookieCache: {
      enabled: false,
    },
  },
  plugins: [
    openAPI(),
    admin({
      defaultRole: "user",
    }),
    nextCookies(),
  ], //api/auth/reference
});
