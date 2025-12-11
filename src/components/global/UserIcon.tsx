import { getDefaultImage } from "@/utils/funcs";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
function UserIcon({
  isLink = false,
  className = "",
}: {
  isLink?: boolean;
  className?: string;
}) {
  const { data } = authClient.useSession();
  const user = data?.user;
  if (!user) return null;
  return isLink ? (
    <Link href={`/profile`}>
      <div className={`size-10 rounded-full overflow-hidden ${className}`}>
        <Image
          src={user.image ?? getDefaultImage(user.name)}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full object-cover object-center"
        />
      </div>
    </Link>
  ) : (
    <div className={`size-10 rounded-full overflow-hidden ${className}`}>
      <Image
        src={user.image ?? getDefaultImage(user.name)}
        alt={user.name}
        width={40}
        height={40}
        className="rounded-full object-cover object-center"
      />
    </div>
  );
}

export default UserIcon;
