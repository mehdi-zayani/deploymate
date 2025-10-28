"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-100 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-6 text-primary">DeployMate</h2>
      <nav className="space-y-3 text-sm">
        <Link href="/dashboard" className="block hover:text-primary">Overview</Link>
        <Link href="/dashboard/deployments" className="block hover:text-primary">Deployments</Link>
        <Link href="/dashboard/settings" className="block hover:text-primary">Settings</Link>
      </nav>
    </aside>
  );
}
