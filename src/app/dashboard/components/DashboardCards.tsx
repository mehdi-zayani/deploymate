"use client";

import { useEffect, useState } from "react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  updated_at: string;
}

interface DashboardCardProps {
  title: string;
  description: string;
}

export default function DashboardCard({ title, description }: DashboardCardProps) {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (title === "Repositories") {
      setLoading(true);
      fetch("/api/github/repos")
        .then((res) => res.json())
        .then((data) => {
          setRepos(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [title]);

  return (
    <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        {description}
      </p>

      {/* Si c’est la card Repositories → on affiche la liste */}
      {title === "Repositories" && (
        <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
          {loading ? (
            <p className="text-sm text-neutral-500">Loading repositories...</p>
          ) : repos.length > 0 ? (
            <ul className="space-y-3">
              {repos.slice(0, 5).map((repo) => (
                <li key={repo.id} className="border-b border-neutral-200 dark:border-neutral-700 pb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-medium"
                  >
                    {repo.name}
                  </a>
                  {repo.language && (
                    <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                      {repo.language}
                    </span>
                  )}
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                    {repo.description || "No description"}
                  </p>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Updated {new Date(repo.updated_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-neutral-500">No repositories found.</p>
          )}
        </div>
      )}
    </div>
  );
}
