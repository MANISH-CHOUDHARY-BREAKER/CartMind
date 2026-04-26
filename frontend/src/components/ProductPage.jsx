import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Brain, Zap, Activity } from "lucide-react";
import Navbar from "../components/Navbar";
import DiscountPopup from "../components/DiscountPopup";
import RecommendationPanel from "../components/RecommendationPanel";
import { trackEvent } from "../api/api";

const USER_ID = 1;
const RECOMMENDATIONS = [
  { id: 1, name: "Sony WH-1000XM5 Wireless Headphones", price: 29990, rating: 4.8, emoji: "🎧", reason: "matches your interest" },
  { id: 2, name: "Apple AirPods Pro (2nd Gen) USB-C", price: 24900, rating: 4.7, emoji: "🎵", reason: "trending now" },
  { id: 3, name: "Bose QuietComfort Ultra", price: 33900, rating: 4.6, emoji: "🔊", reason: "high intent buyers" },
  { id: 4, name: "JBL Tune 770NC", price: 7999, rating: 4.4, emoji: "🎶", reason: "budget pick" },
];

export default function ProductPage() {
  const [clicks, setClicks] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [cartAdded, setCartAdded] = useState(false);
  const [result, setResult] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setTimeSpent((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (timeSpent > 0 && timeSpent % 5 === 0) void send("time_spent", timeSpent);
  }, [timeSpent]);

  const send = async (event_type, value) => {
    const res = await trackEvent({ user_id: USER_ID, event_type, value });
    setResult(res);
    if (res.action === "give_20_discount") setPopupOpen(true);
  };

  const handleClick = () => { setClicks((c) => c + 1); void send("click", clicks + 1); };
  const handleCart = () => { setCartAdded(true); void send("add_to_cart", 1); };

  const engagement = Math.min(clicks * 8 + timeSpent * 2 + (cartAdded ? 25 : 0), 100);
  const intentLabel = useMemo(() => {
    if (engagement > 75) return { text: "🔥 High intent", color: "text-green-400" };
    if (engagement > 40) return { text: "👀 Browsing", color: "text-orange-400" };
    return { text: "💤 Low engagement", color: "text-slate-400" };
  }, [engagement]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="text-xs text-slate-400 mb-4">
          Electronics › Audio › Headphones › <span className="text-white">Sony WH-1000XM5</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Image */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 aspect-square grid place-items-center text-[10rem] sticky top-24" onClick={handleClick}>
              <motion.span animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 4, repeat: Infinity }}>🎧</motion.span>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {["🎧", "🎚️", "📦", "🔌"].map((e, i) => (
                <button key={i} onClick={handleClick}
                  className="aspect-square bg-slate-900/60 border border-white/5 rounded-lg grid place-items-center text-3xl hover:border-orange-500 transition">
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="inline-block px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 text-xs font-semibold">Best Seller</span>
              <h1 className="text-2xl lg:text-3xl font-bold mt-2 leading-tight">
                Sony WH-1000XM5 Wireless Noise Cancelling Headphones — Industry-Leading Audio
              </h1>
              <button className="text-xs text-cyan-400 mt-1 hover:underline" onClick={handleClick}>Visit the Sony Store</button>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-orange-400 text-orange-400" />)}</div>
                <span className="text-sm text-cyan-400">4.8</span>
                <span className="text-xs text-slate-400">· 24,891 ratings</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-slate-400">Deal price:</span>
                <span className="text-3xl font-bold text-orange-400">₹29,990</span>
                <span className="text-sm line-through text-slate-500">₹34,990</span>
                <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs font-semibold">14% OFF</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Inclusive of all taxes · EMI from ₹1,453/mo</p>
            </div>

            <ul className="text-sm space-y-2 text-slate-300">
              <li>• Industry-leading noise cancellation with 8 microphones</li>
              <li>• Up to 30 hours of battery life with quick charge</li>
              <li>• Crystal-clear hands-free calling</li>
              <li>• Multipoint connection — pair two devices at once</li>
            </ul>

            <div className="flex gap-2 pt-2">
              <button className="p-2 border border-slate-700 rounded hover:border-orange-500" onClick={handleClick}><Heart className="h-4 w-4" /></button>
              <button className="p-2 border border-slate-700 rounded hover:border-orange-500" onClick={handleClick}><Share2 className="h-4 w-4" /></button>
            </div>
          </div>

          {/* Buy box + AI panel */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-5 space-y-3">
              <p className="text-2xl font-bold text-orange-400">₹29,990</p>
              <div className="text-xs space-y-1.5 text-slate-400">
                <div className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-green-400" /> FREE delivery <span className="text-white">Tomorrow</span></div>
                <div className="flex items-center gap-2"><Shield className="h-3.5 w-3.5 text-green-400" /> 1 year warranty</div>
                <div className="flex items-center gap-2"><RotateCcw className="h-3.5 w-3.5 text-green-400" /> 10-day return</div>
              </div>
              <p className="text-green-400 text-sm font-semibold">In stock</p>
              <button onClick={handleCart}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-900 font-bold py-2 rounded-lg hover:opacity-90">
                Add to Cart
              </button>
              <button onClick={handleClick}
                className="w-full bg-slate-800 text-white font-bold py-2 rounded-lg hover:bg-slate-700">
                Buy Now
              </button>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-orange-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 grid place-items-center">
                  <Brain className="h-4 w-4 text-slate-900" />
                </div>
                <div>
                  <p className="font-bold text-sm">CartMind Live</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider">Random Forest · Real-time</p>
                </div>
                <span className="ml-auto h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Engagement</span>
                    <span className={intentLabel.color}>{intentLabel.text}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all" style={{ width: `${engagement}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <Metric label="Clicks" value={clicks} />
                  <Metric label="Seconds" value={timeSpent} />
                  <Metric label="Cart" value={cartAdded ? "✓" : "—"} />
                </div>

                {result && (
                  <motion.div key={result.confidence}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="bg-slate-950/40 rounded-xl p-3 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Prediction</span>
                      {result.prediction === 1 ? (
                        <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs flex items-center"><Zap className="h-3 w-3 mr-1" />Will Buy</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs flex items-center"><Activity className="h-3 w-3 mr-1" />May Leave</span>
                      )}
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Confidence</span>
                        <span className="font-bold">{Math.round(result.confidence * 100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-orange-400" style={{ width: `${result.confidence * 100}%` }} />
                      </div>
                    </div>
                    <p className="text-xs mt-2">
                      <span className="text-slate-400">Suggested action: </span>
                      <span className="font-semibold text-orange-400">{result.action.replace(/_/g, " ")}</span>
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        <RecommendationPanel products={RECOMMENDATIONS} />
      </main>

      <DiscountPopup open={popupOpen} discount={20} onClose={() => setPopupOpen(false)} />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="bg-slate-950/40 rounded-lg p-2">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
  );
}
