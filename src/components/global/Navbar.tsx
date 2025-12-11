import { Button } from "../ui/button";
import { AdminAccess, SignedIn, SignedOut } from "../auth/AuthStatusComponent";
import { Suspense } from "react";
import UserIcon from "./UserIcon";
import Link from "next/link";

function Navbar() {
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
              <Link href="/admin">Admin</Link>
            </AdminAccess>
            <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/courses"
            >
              My Courses
            </Link>
            <Link
              className="hover:bg-accent/10 flex items-center px-2"
              href="/purchases"
            >
              Purchase History
            </Link>
            <UserIcon isLink={true} className="self-center" />
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
export default Navbar;
