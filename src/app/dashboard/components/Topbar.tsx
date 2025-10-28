"use client";
import ThemeToggle from "@/components/ThemeToggle";

export default function Topbar() {
  return (
    <header className="flex justify-between items-center h-16 px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <h1 className="font-semibold text-neutral-800 dark:text-neutral-100">Dashboard</h1>
      <ThemeToggle />
    </header>
  );
}
