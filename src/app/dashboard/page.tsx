"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import DashboardCard from "./components/DashboardCards";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch GitHub repos once authenticated ---
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/github/repos")
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) setRepos(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status]);

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
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
        Welcome, {session.user?.name || "User"} 👋
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Deployments */}
        <DashboardCard
          title="Deployments"
          description="Monitor your latest deployments in real-time."
        />

        {/*  Repositories (real GitHub data) */}
        <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-2 text-primary">Repositories</h3>

          {loading ? (
            <p className="text-sm text-neutral-500">Fetching repositories...</p>
          ) : repos.length === 0 ? (
            <p className="text-sm text-neutral-500">No repositories found.</p>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {repos.map((repo) => (
                <li
                  key={repo.id}
                  className="border-b border-neutral-200 dark:border-neutral-700 pb-2"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    {repo.name}
                  </a>
                  <p className="text-xs text-neutral-500">
                    {repo.description || "No description"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Settings */}
        <DashboardCard
          title="Settings"
          description="Adjust your workspace and environment preferences."
        />
      </div>
    </main>
  );
}
