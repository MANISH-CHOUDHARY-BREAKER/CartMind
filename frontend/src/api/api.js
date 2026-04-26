



  // CartMind API client. Override base URL: localStorage.setItem('cartmind_api', 'http://host:port')
const DEFAULT_BASE = import.meta.env.VITE_API_URL ||  "http://localhost:5000";
export const getApiBase = () =>
  (typeof window !== "undefined" && localStorage.getItem("cartmind_api")) || DEFAULT_BASE;

async function fetchJson(path, init, fallback) {
  try {
    const res = await fetch(`${getApiBase()}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    if (fallback !== undefined) {
      console.warn(`[CartMind] ${path} unreachable, using mock.`, err);
      return fallback;
    }
    throw err;
  }
}

export const trackEvent = (payload) =>
  fetchJson("/api/track", { method: "POST", body: JSON.stringify(payload) }, mockPredict(payload));

export const predict = (features) =>
  fetchJson("/predict", { method: "POST", body: JSON.stringify(features) },
    mockPredict({ user_id: 1, event_type: "view", value: 0 }));

export const getStats = (token) =>
  fetchJson("/api/stats", {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : undefined,
  }, mockStats());

function mockPredict(p) {
  const score = Math.min(1, (p.value || 0) * 0.05 + Math.random() * 0.6 + 0.2);
  const willBuy = score > 0.55;
  return {
    prediction: willBuy ? 1 : 0,
    confidence: Number(score.toFixed(2)),
    action: willBuy ? "show_bundle" : score < 0.4 ? "give_20_discount" : "wait",
  };
}
function mockStats() {
  return { total: 1284, buyers: 742, nonBuyers: 542, conversionRate: 57.8,
    avgClicks: 12.4, riskRate: 23.1, avgTime: 184, highRisk: 96 };
}
