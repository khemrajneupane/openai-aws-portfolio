"use client";
import React, { useEffect } from "react";
import "./Profile.css"; // Assume we have some basic styling
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!data?.user) {
      router.push("/login"); // Redirect to login page
    }
  }, [data?.user, router]);

  const user = {
    name: data?.user?.name || "Developer Tester",
    email: data?.user?.email || "developertester@gmail.com",
    avatar:
      data?.user?.image || "https://ui-avatars.com/api/?name=Developer+Tester",
    bio: "This is a placeholder bio for the user",
    role: "user",
    createdAt: data?.user?.createdAt, //new Date().toISOString(),
  };

  const socialLinks = {
    linkedIn: "https://www.linkedin.com/in/khemrajneupane/",
    github: "https://github.com/khemrajneupane",
    website: "https://www.khemrajneupane.com/",
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          <Image
            src={
              data?.user?.image ||
              "https://ui-avatars.com/api/?name=Developer+Tester"
            }
            alt={user.name}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>

        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-role">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account
          </p>
        </div>
      </div>

      <div className="profile-social">
        <h3>Find me</h3>
        <div className="social-links">
          {socialLinks.linkedIn && (
            <a
              href={socialLinks.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin"></i> linkedIn
            </a>
          )}
          {socialLinks.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
          )}
          {socialLinks.website && (
            <a
              href={socialLinks.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fas fa-globe"></i> Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
