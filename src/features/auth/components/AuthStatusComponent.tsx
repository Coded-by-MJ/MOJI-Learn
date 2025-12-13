import {
  getAdminUser,
  getAuthUserServer,
} from "@/features/users/actions";

type SignedInProps = {
  children: React.ReactNode;
};
export async function SignedIn({ children }: SignedInProps) {
  const data = await getAuthUserServer();

  if (!data) return null;

  return <>{children}</>;
}

type SignedOutProps = {
  children: React.ReactNode;
};

export async function SignedOut({ children }: SignedOutProps) {
  const data = await getAuthUserServer();

  if (data) return null;

  return <>{children}</>;
}

type AdminAccessProps = {
  children: React.ReactNode;
};

export async function AdminAccess({ children }: AdminAccessProps) {
  const data = await getAdminUser();

  if (data) {
    return <>{children}</>;
  }
  return null;
}
