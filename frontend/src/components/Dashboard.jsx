import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts";
import { Users, TrendingUp, MousePointerClick, AlertTriangle, Brain, Zap } from "lucide-react";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { getStats } from "../api/api";

const TREND = [
  { day: "Mon", buyers: 88, leavers: 42 },
  { day: "Tue", buyers: 102, leavers: 51 },
  { day: "Wed", buyers: 124, leavers: 38 },
  { day: "Thu", buyers: 116, leavers: 60 },
  { day: "Fri", buyers: 140, leavers: 55 },
  { day: "Sat", buyers: 168, leavers: 72 },
  { day: "Sun", buyers: 154, leavers: 64 },
];
const ACTIONS = [
  { name: "show_bundle", count: 412 },
  { name: "give_20_discount", count: 287 },
  { name: "wait", count: 198 },
  { name: "send_email", count: 121 },
];

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || undefined;
    getStats(token).then(setStats);
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-950 text-white">
        <p className="animate-pulse">Loading premium analytics…</p>
      </div>
    );
  }

  const pie = [
    { name: "Buyers", value: stats.buyers },
    { name: "Non-Buyers", value: stats.nonBuyers },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-orange-400" />
            <h1 className="text-3xl lg:text-4xl font-bold">CartMind Intelligence</h1>
            <span className="ml-2 px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" /> Live
            </span>
          </div>
          <p className="text-slate-400 mt-1">Real-time conversion & retention analytics powered by Random Forest</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Users" value={stats.total.toLocaleString()} icon={Users} accent="cyan" trend="+12% this week" />
          <StatCard title="Conversion" value={`${stats.conversionRate}%`} icon={TrendingUp} accent="green" trend="+3.4% vs last" />
          <StatCard title="Avg Clicks" value={stats.avgClicks} icon={MousePointerClick} accent="orange" trend="per session" />
          <StatCard title="Risk Rate" value={`${stats.riskRate}%`} icon={AlertTriangle} accent="red" trend={`${stats.highRisk} high-risk`} />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
            <h3 className="font-bold mb-4">Conversion Trend (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={TREND}>
                <defs>
                  <linearGradient id="b" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(32,100%,50%)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(32,100%,50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="l" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0,75%,55%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(0,75%,55%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8 }} />
                <Area type="monotone" dataKey="buyers" stroke="hsl(32,100%,50%)" fill="url(#b)" strokeWidth={2} />
                <Area type="monotone" dataKey="leavers" stroke="hsl(0,75%,55%)" fill="url(#l)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
            <h3 className="font-bold mb-4">Buyer Distribution</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={pie} dataKey="value" innerRadius={50} outerRadius={90} paddingAngle={4}>
                  <Cell fill="hsl(142,70%,45%)" />
                  <Cell fill="hsl(0,75%,55%)" />
                </Pie>
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
            <h3 className="font-bold mb-4">AI-Triggered Actions</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={ACTIONS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8 }} />
                <Bar dataKey="count" fill="hsl(192,90%,48%)" radius={[8,8,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-orange-400" />
              <h3 className="font-bold">AI Insights</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between"><span className="text-slate-400">🛒 Buyers</span><span className="font-bold">{stats.buyers}</span></li>
              <li className="flex justify-between"><span className="text-slate-400">🚪 Non-buyers</span><span className="font-bold">{stats.nonBuyers}</span></li>
              <li className="flex justify-between"><span className="text-slate-400">⏱ Avg time</span><span className="font-bold">{stats.avgTime}s</span></li>
              <li className="flex justify-between"><span className="text-slate-400">⚠ High risk</span><span className="font-bold text-red-400">{stats.highRisk}</span></li>
            </ul>
            <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
              <p className="text-xs text-orange-400 uppercase tracking-wider font-semibold">🎯 Best Action</p>
              <p className="text-sm font-bold mt-1">Smart Discount + Product Bundle</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
