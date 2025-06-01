import Image from "next/image";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
}

export default function UserAvatar({ user }: { user: User }) {
  function getInitials(userName: string): string {
    if (!userName) return "";

    return userName
      .trim()
      .split(/\s+/) // split on one or more whitespace characters
      .map((word) => word[0].toUpperCase())
      .join("")
      .slice(0, 2); // limit to first two initials
  }

  return user?.image ? (
    <Link href="profile">
      <Image
        src={user?.image}
        alt={user?.name}
        width={50}
        height={50}
        className="rounded-full"
      />
    </Link>
  ) : (
    <Link href="/profile" className="flex items-center justify-center">
      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs font-semibold">
        {getInitials(user?.name)}
      </div>
    </Link>
  );
}
