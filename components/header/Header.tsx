"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "./header.css";
import UserAvatar from "../authForm/UserAvatar";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "../LanguageSwitcher";
import { Home, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
const Header = () => {
  const { data } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoutHandler = () => {
    signOut();
    router.push("/login");
  };
  const user = {
    _id: data?.user?._id as string,
    name: data?.user?.name || "",
    email: data?.user?.email || "",
    image: data?.user?.image || undefined,
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log("scrolled", window.pageYOffset);
      if (window.pageYOffset > 89) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`z-20 fixed w-full flex justify-between texts-center  rounded-3xl shadow-amber-900 ${
        scrolled
          ? "bg-gradient-to-tr from-slate-50  to-slate-500"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between text-center py-4 px-4 md:py-8 md:px-32 flex-1">
        <Link href="/" className="home-button ">
          <Home size={35} className="ring-1 rounded-xl p-1" />
        </Link>
        <div className="hidden md:flex texts-center justify-center gap-4">
          {data?.user && <UserAvatar user={user} />}
          <Link
            href="/about"
            className="text-white self-center text-md hover:bg-blue-700/80 ring-1 rounded-md p-1"
          >
            Portfolio
          </Link>
          <LanguageSwitcher
            showLine={true}
            customClass={`self-center text-white text-md hover:bg-blue-700/80 ring-1 rounded-md p-1`}
          />

          {data?.user ? (
            <button
              onClick={logoutHandler}
              className="text-white self-center text-md hover:bg-blue-700/80 ring-1 rounded-md p-1"
            >
              <i className="fas fa-sign-out-alt me-2"></i>Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="text-white self-center text-md hover:bg-blue-700/80 ring-1 rounded-md p-1"
            >
              <i className="fas fa-sign-in-alt me-2"></i>Login
            </Link>
          )}
        </div>
        {!isMenuOpen && (
          <button className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
            <Menu size={36} />
          </button>
        )}
      </div>
      {isMenuOpen && (
        <div
          className="md:hidden  fixed inset-0 bg-black/40 z-20 flex justify-end"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="md:hidden relative flex flex-col h-full w-[calc(250px)] bg-[#4e225d] p-1 gap-1 "
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-button"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="flex flex-col justify-between gap-5">
              {data?.user && <UserAvatar user={user} />}
              <Link
                href="/about"
                className="bg-slate-50 text-[#4e225d] text-md hover:bg-blue-100/80 ring-1 rounded-md p-1"
              >
                <i className="fas fa-sign-in-alt me-2"></i>Portfolio
              </Link>
              <div className="bg-slate-50 text-[#4e225d] text-md hover:bg-blue-100/80 ring-1 rounded-md p-1">
                <LanguageSwitcher
                  showLine={false}
                  customClass="items-center justify-center bg-slate-50 text-[#4e225d] text-md hover:bg-blue-100/80 ring-1 rounded-md p-1"
                />
              </div>
              {data?.user ? (
                <button
                  onClick={logoutHandler}
                  className="bg-slate-50 text-[#4e225d] text-md hover:bg-blue-100/80 ring-1 rounded-md p-1"
                >
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="bg-slate-50 text-[#4e225d] text-md hover:bg-blue-100/80 ring-1 rounded-md p-1"
                >
                  <i className="fas fa-sign-in-alt me-2"></i>Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
