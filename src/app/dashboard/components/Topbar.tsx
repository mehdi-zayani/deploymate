"use client";

import ThemeToggle from "@/components/ThemeToggle";

export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <h1 className="text-xl font-semibold">Dashboard</h1>
    </header>
  );
}
