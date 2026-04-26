import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage";
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
