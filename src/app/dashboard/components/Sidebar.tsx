"use client";
import Link from "next/link";
import { Home, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-100 dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800 p-4 flex flex-col">
      <h2 className="text-xl font-bold text-violet-600 mb-8">DeployMate</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 hover:text-violet-500 transition">
          <Home size={18} /> Dashboard
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-2 hover:text-violet-500 transition">
          <Settings size={18} /> Settings
        </Link>
      </nav>
    </aside>
  );
}
