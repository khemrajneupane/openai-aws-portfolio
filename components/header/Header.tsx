"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import "./header.css";
import UserAvatar from "../authForm/UserAvatar";
import { useRouter } from "next/navigation";
import LanguageSwitcher from "../LanguageSwitcher";
import { Home, Menu, X } from "lucide-react";
import { useState } from "react";
const Header = () => {
  const { data } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoutHandler = () => {
    signOut();
    router.push("/");
  };
  const user = {
    _id: data?.user?._id as string,
    name: data?.user?.name || "",
    email: data?.user?.email || "",
    image: data?.user?.image || undefined,
  };
  return (
    <header className="custom-header">
      <div className="header-container">
        <Link href="/" className="home-button">
          <Home size={20} />
        </Link>
        <div className="desktop-nav">
          {data?.user && <UserAvatar user={user} />}
          <Link href="/about" className="nav-button">
            <i className="fas fa-sign-in-alt me-2"></i>Portfolio
          </Link>
          <LanguageSwitcher />
          {data?.user ? (
            <button onClick={logoutHandler} className="nav-button logout">
              <i className="fas fa-sign-out-alt me-2"></i>Logout
            </button>
          ) : (
            <Link href="/login" className="nav-button">
              <i className="fas fa-sign-in-alt me-2"></i>Login
            </Link>
          )}
        </div>
        {!isMenuOpen && (
          <button className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        )}
      </div>
      {/* Sidebar Menu */}
      {isMenuOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
            <div className="mobile-nav-items">
              {data?.user && <UserAvatar user={user} />}
              <Link href="/about" className="nav-button light">
                <i className="fas fa-sign-in-alt me-2"></i>Portfolio
              </Link>
              <div className="nav-button light">
                <LanguageSwitcher />
              </div>
              {data?.user ? (
                <button
                  onClick={logoutHandler}
                  className="nav-button logout light"
                >
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </button>
              ) : (
                <Link href="/login" className="nav-button light">
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
