import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins";

import type { auth } from "./auth";
export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), adminClient()],
});


export type UserSession = Awaited<ReturnType<typeof authClient.useSession>>["data"];