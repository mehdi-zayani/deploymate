"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import DashboardCard from "./components/DashboardCards";

export default function DashboardPage() {
  const { data: session, status } = useSession();


  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-sm">checking session data...</p>
      </div>
    );
  }

  if (!session) {
    redirect("/api/auth/signin");
  }


  return (
    <main className="min-h-screen bg-white dark:bg-neutral-950 p-8">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
        Welcome, {session.user?.name || "Utilisateur"} 👋
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
