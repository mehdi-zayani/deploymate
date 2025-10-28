"use client";

import { useSession, signIn } from "next-auth/react";
import DashboardCard from "./components/DashboardCards";
import RepositoriesCard from "./components/RepositoriesCard";
import DeploymentsCard from "./components/DeploymentsCard"; // added

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // --- Loading state ---
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm">Checking session data...</p>
      </div>
    );
  }

  // --- Unauthenticated state ---
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-950 text-center">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-3">
          Access Denied
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          You must be signed in to view the dashboard.
        </p>
        <button
          onClick={() => signIn("github")}
          className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-dark transition"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  // --- Authenticated state ---
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 p-8">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-8">
        Welcome, {session.user?.name || "User"} 👋
      </h1>

      {/* Single-column layout: one section per line */}
      <div className="flex flex-col gap-8">
        {/* GitHub Repositories */}
        <RepositoriesCard />

        {/* GitHub Deployments */}
        <DeploymentsCard />

        {/* Settings */}
        <DashboardCard
          title="Settings"
          description="Adjust your workspace and environment preferences."
        />
      </div>
    </main>
  );
}
