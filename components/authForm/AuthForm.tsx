"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  const [email, setEmail] = useState(
    type === "login" ? "developertester@gmail.com" : ""
  );
  const [password, setPassword] = useState(type === "login" ? "12345678" : "");

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (type === "login") {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push("/");
        }
      } else {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Registration failed");
        }

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError(result.error);
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const googleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#4e225d]">
          {type === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </h2>
      </div>
      {error && (
        <div className="bg-[#4e225d] border border-[#4e225d] text-white px-4 py-3 rounded relative">
          {error}
        </div>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {type === "register" && (
          <div>
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder={
              type === "login"
                ? "developertester@gmail.com"
                : "Enter your email"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
            placeholder={type === "login" ? "12345678" : ""}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#4e225d] hover:bg-[#3c2344] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <span>Processing...</span>
            ) : type === "login" ? (
              "Sign in"
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
      <div className="text-center">
        <a
          href={type === "login" ? "/register" : "/login"}
          className="font-medium text-[#4e225d]"
        >
          {type === "login"
            ? "Need an account? Register"
            : "Already have an account? Sign in"}
        </a>
      </div>
      <p className="text-muted mb-3 text-[#4e225d]">Or login with</p>
      <button
        onClick={() => googleLogin()}
        type="button"
        className="bg-[#4e225d] hover:bg-red-600 text-white rounded-4xl pl-3 pr-3 pt-2 pb-2 mr-2"
      >
        <i className="fab fa-google"></i>
      </button>
    </div>
  );
}
