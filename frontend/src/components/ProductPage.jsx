import { useState } from "react";
import { trackEvent } from "../api/api";

export default function ProductPage() {
  const [data, setData] = useState({
    clicks: 0,
    time_spent: 0,
    cart_added: 0,
    last_login: 2
  });

  const [result, setResult] = useState(null);

  const USER_ID = 1; // static for now

  // 🖱 Track Click Event + Predict
  const handleClick = async () => {
    setData((prev) => ({
      ...prev,
      clicks: prev.clicks + 1
    }));

    try {
      const res = await trackEvent({
        user_id: USER_ID,
        event_type: "click",
        value: 1
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ⏱ Track Time Spent + Predict
  const handleTime = async () => {
    setData((prev) => ({
      ...prev,
      time_spent: prev.time_spent + 1
    }));

    try {
      const res = await trackEvent({
        user_id: USER_ID,
        event_type: "time_spent",
        value: 1
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🛒 Track Add to Cart + Predict
  const handleCart = async () => {
    setData((prev) => ({
      ...prev,
      cart_added: 1
    }));

    try {
      const res = await trackEvent({
        user_id: USER_ID,
        event_type: "add_to_cart",
        value: 1
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-black text-white p-6">

      {/* Title */}
      <h1 className="text-4xl font-bold mb-8">
        🧠 CartMind Smart Engine
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl shadow-lg transition"
        >
          Click Product ({data.clicks})
        </button>

        <button
          onClick={handleTime}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-xl shadow-lg transition"
        >
          Spend Time ({data.time_spent})
        </button>

        <button
          onClick={handleCart}
          className="bg-yellow-500 hover:bg-yellow-600 px-5 py-2 rounded-xl shadow-lg transition"
        >
          Add to Cart
        </button>
      </div>

      {/* Result Card */}
      {result && (
        <div className="bg-white text-black p-6 rounded-2xl shadow-2xl w-80 text-center">
          <p className="text-xl font-semibold">
            {result.prediction === 1 ? "🟢 Will Buy" : "🔴 Will Leave"}
          </p>

          <p className="mt-2">
            Confidence: {result.confidence}
          </p>

          <p className="mt-2 font-medium">
            Action: {result.action}
          </p>
        </div>
      )}

      {/* 🎉 SMART POPUP */}
      {result && result.action === "give_20_discount" && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-2xl shadow-xl text-center w-80">
            <h2 className="text-xl font-bold mb-2">🎉 Special Offer!</h2>
            <p className="mb-4">
              Get 20% OFF if you checkout now!
            </p>

            <button
              onClick={() => setResult(null)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Claim Offer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

