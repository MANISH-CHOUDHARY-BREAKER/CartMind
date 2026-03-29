import { useState } from "react";
import ProductPage from "./components/ProductPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [page, setPage] = useState("product");

  return (
    <div>
      {/* Navigation */}
      <div className="flex gap-4 p-4 bg-black text-white justify-center">
        <button onClick={() => setPage("product")}>
          Product Page
        </button>
        <button onClick={() => setPage("dashboard")}>
          Dashboard
        </button>
      </div>

      {/* Page Rendering */}
      {page === "product" ? <ProductPage /> : <Dashboard />}
    </div>
  );
}

export default App;