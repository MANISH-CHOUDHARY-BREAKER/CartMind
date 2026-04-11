import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "admin123") {
      onLogin(true);
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow w-80">
        <h1 className="text-2xl font-bold mb-4">🔐 Admin Login</h1>

        <input
          type="password"
          placeholder="Enter password"
          className="border p-2 w-full rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
}
