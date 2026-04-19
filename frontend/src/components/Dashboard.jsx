
import { useEffect, useState } from "react";
import { getStats } from "../api/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    getStats(token)
      .then((res) => {
        console.log("Dashboard API:", res.data);
        setStats(res.data);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-white bg-black">
        Loading premium analytics...
      </div>
    );
  }

  // Safe Data
  const chartData = [
    { name: "Buyers", value: stats.buyers ?? 0 },
    { name: "Non-Buyers", value: stats.nonBuyers ?? 0 },
  ];

  const cards = [
    { title: "👥 Total Users", value: stats.total ?? 0 },
    { title: "📈 Conversion %", value: `${stats.conversionRate ?? 0}%` },
    { title: "🖱 Avg Clicks", value: stats.avgClicks ?? 0 },
    { title: "⚠ Risk %", value: `${stats.riskRate ?? 0}%` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-bold tracking-tight">
          🚀 CartMind Intelligence
        </h1>
        <p className="text-slate-400 mt-2">
          AI-powered conversion & retention analytics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {cards.map((card, index) => (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/10 border border-white/10 rounded-3xl shadow-2xl p-6 hover:scale-105 transition"
          >
            <p className="text-slate-300 text-sm">{card.title}</p>
            <h2 className="text-4xl font-bold mt-3">{card.value}</h2>
          </div>
        ))}
      </div>

      {/* Chart + Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Pie Chart */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">
            🥧 Buyer Distribution
          </h2>

          {/* ✅ FIXED HEIGHT CONTAINER */}
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={120}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  <Cell fill="#22c55e" /> {/* Buyers */}
                  <Cell fill="#ef4444" /> {/* Non Buyers */}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6">
          <h2 className="text-2xl font-semibold mb-6">🧠 AI Insights</h2>

          <div className="space-y-4 text-lg">
            <p>🛒 Buyers: <b>{stats.buyers ?? 0}</b></p>
            <p>🚪 Non Buyers: <b>{stats.nonBuyers ?? 0}</b></p>
            <p>⏱ Avg Time Spent: <b>{stats.avgTime ?? 0}</b></p>
            <p>⚠ High Risk Users: <b>{stats.highRisk ?? 0}</b></p>
            <p>🎯 Best Action: <b>Smart Discount + Product Bundle</b></p>
          </div>
        </div>

      </div>
    </div>
  );
}
