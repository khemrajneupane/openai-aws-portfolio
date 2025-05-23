"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "./header.css";
import UserAvatar from "../authForm/UserAvatar";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "../LanguageSwitcher";

const Header = () => {
  const { data } = useSession();
  const router = useRouter();
  const logoutHandler = () => {
    signOut();
    router.push("/");
  };
  const user = {
    _id: data?.user?._id as string, // provide default or handle nulls
    name: data?.user?.name || "",
    email: data?.user?.email || "",
    image: data?.user?.image || undefined, // might be undefined
  };
  return (
    <header className="header bg-primary text-white shadow-sm sticky-top py-3">
      <h1 className="mb-0 fs-6 fs-sm-6 fs-md-5 fs-lg-4 fs-xl-3 fw-bold">
        {data?.user && <UserAvatar user={user} />}
      </h1>
      <h1>Portfolio</h1>
      {<LanguageSwitcher />}
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <nav className="nav-links d-flex align-items-center gap-3">
            {data?.user ? (
              <button
                onClick={logoutHandler}
                className="nav-link btn btn-danger btn-sm px-3 py-1 rounded-pill"
              >
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </button>
            ) : (
              <Link
                href="/login"
                className="nav-link btn btn-success btn-sm px-3 py-1 rounded-pill"
              >
                <i className="fas fa-sign-in-alt me-2"></i>Login
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
