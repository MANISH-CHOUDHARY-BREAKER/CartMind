import { useState } from "react";
import { predictUser } from "../api/api";

export default function ProductPage() {
  const [data, setData] = useState({
    clicks: 0,
    time_spent: 0,
    cart_added: 0,
    last_login: 2
  });

  const [result, setResult] = useState(null);

  // Handlers
  const handleClick = () => {
    setData({ ...data, clicks: data.clicks + 1 });
  };

  const handleTime = () => {
    setData({ ...data, time_spent: data.time_spent + 1 });
  };

  const handleCart = () => {
    setData({ ...data, cart_added: 1 });
  };

  const handlePredict = async () => {
    try {
      const res = await predictUser(data);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-6">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">🛒 CartMind Smart Product</h1>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        <button
          onClick={handleClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Click Product ({data.clicks})
        </button>

        <button
          onClick={handleTime}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
        >
          Spend Time ({data.time_spent})
        </button>

        <button
          onClick={handleCart}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow"
        >
          Add to Cart
        </button>
      </div>

      {/* Predict Button */}
      <button
        onClick={handlePredict}
        className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-lg shadow mb-6"
      >
        Predict Behavior
      </button>

      {/* Result Card */}
      {result && (
        <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
          <p className="text-lg font-semibold">
            Prediction: {result.prediction === 1 ? "🟢 Will Buy" : "🔴 Will Leave"}
          </p>

          <p className="mt-2">
            Confidence: {result.confidence.toFixed(2)}
          </p>

          <p className="mt-2 font-medium">
            Action: {result.action}
          </p>
        </div>
      )}

      {/* SMART POPUP */}
      {result && result.prediction === 0 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center w-80">
            <h2 className="text-xl font-bold mb-2">🎉 Special Offer!</h2>
            <p className="mb-4">Get 20% OFF if you buy now!</p>

            <button
              onClick={() => setResult(null)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Claim Offer
            </button>
          </div>
        </div>
      )}

    </div>
  );
}