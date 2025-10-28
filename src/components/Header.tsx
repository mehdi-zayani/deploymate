"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      {/* Logo + thème */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="text-xl font-semibold text-primary dark:text-primary-light"
        >
          DM
        </Link>
        <ThemeToggle />
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-4">
        <Link
          href="/dashboard"
          className="hover:text-primary transition-colors"
        >
          Dashboard
        </Link>

        {session ? (
          <>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {session.user?.name || "User"}
            </span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 rounded-md bg-primary text-white text-sm hover:bg-primary-dark transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn("github")}
            className="px-3 py-1 rounded-md bg-primary text-white text-sm hover:bg-primary-dark transition"
          >
            Login
          </button>
        )}
      </nav>
    </header>
  );
}
