import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Lock } from "lucide-react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("token", "demo-admin-token");
      navigate("/admin/dashboard");
    } else {
      setError("Wrong password. Hint: admin123");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-slate-950 text-white p-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 grid place-items-center">
            <Brain className="h-6 w-6 text-slate-900" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">CartMind Admin</h1>
            <p className="text-xs text-slate-400">Secure dashboard access</p>
          </div>
        </div>

        <label className="text-xs uppercase tracking-wider text-slate-400">Password</label>
        <div className="relative mt-1">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            placeholder="Enter admin password"
            className="w-full pl-10 h-11 rounded-md bg-slate-950/60 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

        <button type="submit"
          className="mt-5 w-full bg-gradient-to-r from-orange-500 to-amber-400 text-slate-900 font-bold py-2.5 rounded-lg hover:opacity-90">
          Login
        </button>
        <p className="text-[10px] text-slate-500 mt-4 text-center">Demo password: admin123</p>
      </form>
    </div>
  );
}
