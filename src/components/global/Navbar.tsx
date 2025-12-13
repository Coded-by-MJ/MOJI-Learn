import { Button } from "../ui/button";
import {
  AdminAccess,
  SignedIn,
  SignedOut,
} from "../../features/auth/components/AuthStatusComponent";
import { Suspense } from "react";
import UserIcon from "./UserIcon";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function UserNavbar() {
  return (
    <header className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container mx-auto px-4">
        <Link
          className="mr-auto text-lg hover:underline flex items-center"
          href="/"
        >
          MOJI Learn
        </Link>
        <Suspense>
          <SignedIn>
            <AdminAccess>
              <Link
                className="hover:bg-accent/50 flex items-center px-2"
                href="/admin"
              >
                Admin
              </Link>
            </AdminAccess>
            <Link
              className="hover:bg-accent/50 flex items-center px-2"
              href="/courses"
            >
              My Courses
            </Link>
            <Link
              className="hover:bg-accent/50 flex items-center px-2"
              href="/purchases"
            >
              Purchase History
            </Link>
            <UserIcon isLink={true} className="self-center shrink-0" />
          </SignedIn>
        </Suspense>
        <Suspense>
          <SignedOut>
            <Button className="self-center" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </Suspense>
      </nav>
    </header>
  );
}

export function AdminNavbar() {
  return (
    <header className="flex h-12 shadow bg-background z-10">
      <nav className="flex gap-4 container mx-auto px-4">
        <div className="mr-auto flex items-center gap-2">
          <Link className="text-lg hover:underline" href="/admin">
            MOJI Learn
          </Link>
          <Badge>Admin</Badge>
        </div>
        <Link
          className="hover:bg-accent/50 flex items-center px-2"
          href="/admin/courses"
        >
          Courses
        </Link>
        <Link
          className="hover:bg-accent/50 flex items-center px-2"
          href="/admin/products"
        >
          Products
        </Link>
        <Link
          className="hover:bg-accent/50 flex items-center px-2"
          href="/admin/sales"
        >
          Sales
        </Link>
        <UserIcon isLink={true} className="self-center shrink-0" />
      </nav>
    </header>
  );
}
