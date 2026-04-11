

import { useState } from "react";
import ProductPage from "./components/ProductPage";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";


export default function App() {
const [page, setPage] = useState("product");
const [adminLogged, setAdminLogged] = useState(!!localStorage.getItem("token"));


return (
<div>
<div className="flex gap-4 p-4 bg-black text-white justify-center">
<button onClick={() => setPage("product")}>Product Page</button>
<button onClick={() => setPage("dashboard")}>Dashboard</button>
</div>


{page === "product" ? (
<ProductPage />
) : adminLogged ? (
<Dashboard />
) : (
<AdminLogin onLogin={setAdminLogged} />
)}
</div>
);
}