import DashboardCard from "./components/DashboardCards";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <DashboardCard title="Deployments" description="Monitor your latest deployments in real-time." />
      <DashboardCard title="Repositories" description="Manage your connected GitHub repositories." />
      <DashboardCard title="Settings" description="Adjust your workspace and environment preferences." />
    </div>
  );
}
