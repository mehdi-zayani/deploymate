"use client";

import { useSession, signIn } from "next-auth/react";
import DashboardCard from "./components/DashboardCards";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  // ⏳ État de chargement
  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm">Checking session data...</p>
      </div>
    );
  }

  // ❌ Non authentifié → afficher un message
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

  // ✅ Authentifié → afficher le dashboard
  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 p-8">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
        Welcome, {session.user?.name || "User"} 👋
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Deployments"
          description="Monitor your latest deployments in real-time."
        />
        <DashboardCard
          title="Repositories"
          description="Manage your connected GitHub repositories."
        />
        <DashboardCard
          title="Settings"
          description="Adjust your workspace and environment preferences."
        />
      </div>
    </main>
  );
}
