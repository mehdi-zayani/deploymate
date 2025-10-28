"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";

interface Deployment {
  id: number;
  repo: string;
  workflow_name: string;
  status: string;
  branch: string;
  updated_at: string;
  html_url: string;
}

export default function DeploymentsCard() {
  const [deployments, setDeployments] = useState<Deployment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github/deployments")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setDeployments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="text-primary" size={20} />
        <h3 className="text-lg font-semibold text-primary">Deployments</h3>
      </div>

      {loading ? (
        <p className="text-sm text-neutral-500">Fetching deployment data...</p>
      ) : deployments.length === 0 ? (
        <p className="text-sm text-neutral-500">No deployment data found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deployments.map((d) => (
            <a
              key={d.id}
              href={d.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-start p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {/* Repository name */}
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-primary shrink-0" />
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">
                  {d.repo}
                </p>
              </div>

              {/* Workflow name */}
              <p className="text-xs text-neutral-700 dark:text-neutral-400 line-clamp-2">
                {d.workflow_name}
              </p>

              {/* Branch */}
              <p className="text-xs text-neutral-500 mt-1">
                Branch: <span className="font-medium">{d.branch}</span>
              </p>

              {/* Status badge */}
              <span
                className={`mt-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                  d.status === "success"
                    ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-100"
                    : d.status === "failure"
                    ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-100"
                    : "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                }`}
              >
                {d.status}
              </span>

              {/* Date */}
              <p className="text-[10px] text-neutral-500 mt-2">
                Updated {new Date(d.updated_at).toLocaleString()}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
