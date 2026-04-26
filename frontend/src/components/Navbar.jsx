import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, MapPin, Brain } from "lucide-react";

export default function Navbar() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-lg border-b border-slate-800">
      <div className="flex items-center gap-4 px-4 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-orange-500 to-amber-400 grid place-items-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition">
            <Brain className="h-5 w-5 text-slate-900" />
          </div>
          <div className="leading-tight">
            <div className="font-bold text-lg tracking-tight text-white">
              cart<span className="text-orange-400">mind</span>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-slate-400 -mt-1">
              ai intelligence
            </div>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-xs text-slate-400 border-l border-slate-700 pl-4">
          <MapPin className="h-3.5 w-3.5" />
          <div>
            <div className="text-[10px]">Deliver to</div>
            <div className="text-white font-semibold">Bengaluru 560001</div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search products, brands, AI insights…"
              className="pl-10 h-11 w-full rounded-md bg-slate-950/60 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
          <Link to="/" className={!isAdmin ? "text-orange-400" : "hover:text-orange-400"}>Shop</Link>
          <Link to="/admin" className={isAdmin ? "text-orange-400" : "hover:text-orange-400"}>Admin</Link>
        </nav>

        <button className="relative p-2 text-slate-200 hover:text-orange-400 transition" aria-label="Cart">
          <ShoppingCart className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-orange-500 text-slate-900 text-[10px] font-bold grid place-items-center">0</span>
        </button>
      </div>

      <div className="hidden md:flex items-center gap-6 px-4 lg:px-8 h-9 text-xs text-slate-400 border-t border-slate-800/50 bg-slate-950/30">
        <span className="hover:text-orange-400 cursor-pointer">Today's Deals</span>
        <span className="hover:text-orange-400 cursor-pointer">Electronics</span>
        <span className="hover:text-orange-400 cursor-pointer">Fashion</span>
        <span className="hover:text-orange-400 cursor-pointer">Smart Home</span>
        <span className="hover:text-orange-400 cursor-pointer">AI Picks for You</span>
        <span className="ml-auto text-orange-400 font-semibold">⚡ Live model: random_forest_v2</span>
      </div>
    </header>
  );
}
