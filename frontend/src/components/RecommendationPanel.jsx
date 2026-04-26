import { motion } from "framer-motion";
import { Star, TrendingUp } from "lucide-react";

export default function RecommendationPanel({ products = [] }) {
  return (
    <section className="mt-10">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-5 w-5 text-orange-400" />
        <h2 className="text-xl font-bold text-white">AI Picks Based on Your Behavior</h2>
        <span className="text-xs text-slate-400 ml-2">Powered by Random Forest</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5 p-4 hover:border-orange-500/40 transition cursor-pointer group"
          >
            <div className="aspect-square bg-slate-950/40 rounded-xl grid place-items-center text-5xl mb-3 group-hover:scale-105 transition">
              {p.emoji}
            </div>
            <p className="text-xs text-orange-400 uppercase tracking-wider">{p.reason}</p>
            <h3 className="text-sm font-semibold text-white mt-1 line-clamp-2">{p.name}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-base font-bold text-orange-400">₹{p.price.toLocaleString()}</span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Star className="h-3 w-3 fill-orange-400 text-orange-400" /> {p.rating}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
