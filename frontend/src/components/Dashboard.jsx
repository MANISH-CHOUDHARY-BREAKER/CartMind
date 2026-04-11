import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import Charts from "./Charts";
import { getStats } from "../api/api";


export default function Dashboard() {
const [stats, setStats] = useState(null);


useEffect(() => {
const token = localStorage.getItem("token");
if (token) {
getStats(token).then((res) => setStats(res.data));
}
}, []);


if (!stats) {
return <div className="p-6">Loading advanced analytics...</div>;
}


return (
<div className="min-h-screen bg-gradient-to-r from-slate-100 to-blue-100 p-6">
<h1 className="text-3xl font-bold mb-6">📈 Advanced CartMind Analytics</h1>


<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  <StatCard title="Total Users" value={stats.total} />
<StatCard title="Conversion %" value={`${stats.conversionRate}%`} />
<StatCard title="Avg Clicks" value={stats.avgClicks} />
<StatCard title="Risk %" value={`${stats.riskRate}%`} />
</div>


<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<Charts buyers={stats.buyers} nonBuyers={stats.nonBuyers} />


<div className="bg-white rounded-2xl shadow-xl p-6">
<h2 className="text-xl font-semibold mb-4">📊 KPI Insights</h2>
<p>🛒 Buyers: {stats.buyers}</p>
<p>🚪 Non Buyers: {stats.nonBuyers}</p>
<p>⏱ Avg Time Spent: {stats.avgTime}</p>
<p>⚠️ High Risk Users: {stats.highRisk}</p>
</div>
</div>
</div>
);
}