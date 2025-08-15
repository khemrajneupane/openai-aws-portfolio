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
    <Link
      href="profile"
      className="bg-blue-700/80  text-white text-xl hover:bg-blue-700/80 ring-1 rounded-md p-1"
    >
      <Image
        src={user?.image}
        alt={user?.name}
        width={50}
        height={50}
        className="rounded-full"
      />
    </Link>
  ) : (
    <Link href="/profile" className="p-1 flex items-center justify-center">
      <div className="p-2 w-11 text-white text-xl  hover:bg-blue-700/80 ring-1  ring-amber-50 rounded-full">
        {getInitials(user?.name)}
      </div>
    </Link>
  );
}
