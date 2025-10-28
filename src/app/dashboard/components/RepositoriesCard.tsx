"use client";

import { useEffect, useState } from "react";
import { FolderGit2 } from "lucide-react";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
}

export default function RepositoriesCard() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("/api/github/repos");
        const data = await res.json();
        if (!data.error) setRepos(data);
      } catch (err) {
        console.error("Error fetching repos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-4 text-primary">Repositories</h3>

      {loading ? (
        <p className="text-sm text-neutral-500">Fetching repositories...</p>
      ) : repos.length === 0 ? (
        <p className="text-sm text-neutral-500">No repositories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {repos.slice(0, 8).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {/* Icône + Nom */}
              <div className="flex items-center gap-2 mb-2">
                <FolderGit2 className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">
                  {repo.name}
                </p>
              </div>

              {/* Description visible directement */}
              <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3">
                {repo.description || "No description provided"}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
