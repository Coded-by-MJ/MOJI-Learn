"use client";
import { getDefaultImage } from "@/utils/helperFuncs";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import SignOutLink from "@/features/auth/components/SignOutLink";
function UserIcon({ className = "" }: { className?: string }) {
  const { data } = authClient.useSession();
  const user = data?.user;
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={`size-10 rounded-full overflow-hidden ${className}`}>
          <Image
            src={user.image ?? getDefaultImage(user.name)}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full object-cover object-center"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/profile" className="w-full text-left">
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutLink className="w-full text-left" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserIcon;
