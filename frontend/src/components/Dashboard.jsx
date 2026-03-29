import { useState } from "react";
import StatCard from "./StatCard";
import Charts from "./Charts";

export default function Dashboard() {
  // Fake data (later connect backend)
  const [stats] = useState({
    total: 100,
    buyers: 60,
    nonBuyers: 40,
    highRisk: 25
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">📊 CartMind Dashboard</h1>

      {/* Stats */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <StatCard title="Total Users" value={stats.total} />
        <StatCard title="Buyers" value={stats.buyers} />
        <StatCard title="Non-Buyers" value={stats.nonBuyers} />
        <StatCard title="High Risk" value={stats.highRisk} />
      </div>

      {/* Chart */}
      <Charts buyers={stats.buyers} nonBuyers={stats.nonBuyers} />

    </div>
  );
}