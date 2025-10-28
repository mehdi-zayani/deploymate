"use client";

interface DashboardCardProps {
  title: string;
  description: string;
}

export default function DashboardCard({ title, description }: DashboardCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
}
