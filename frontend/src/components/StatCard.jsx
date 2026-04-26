


export default function StatCard({ title, value, icon: Icon, trend, accent = "orange" }) {
  const accentMap = {
    orange: "from-orange-500/20 to-orange-400/5 text-orange-400",
    green: "from-green-500/20 to-green-400/5 text-green-400",
    red: "from-red-500/20 to-red-400/5 text-red-400",
    cyan: "from-cyan-500/20 to-cyan-400/5 text-cyan-400",
  };
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5 p-5 hover:scale-[1.02] transition">
      <div className={`absolute inset-0 bg-gradient-to-br ${accentMap[accent]} opacity-40 pointer-events-none`} />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-slate-400">{title}</p>
          {Icon && <Icon className={`h-5 w-5 ${accentMap[accent].split(" ").pop()}`} />}
        </div>
        <p className="text-3xl font-bold mt-3 text-white">{value}</p>
        {trend && <p className="text-xs text-slate-400 mt-1">{trend}</p>}
      </div>
    </div>
  );
}
