import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export default function DiscountPopup({ open, discount = 20, onClose }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(onClose, 8000);
    return () => clearTimeout(t);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="relative rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 p-5 shadow-2xl shadow-orange-500/40 text-slate-900">
            <button onClick={onClose} className="absolute top-2 right-2 p-1 hover:bg-black/10 rounded">
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest">CartMind AI</span>
            </div>
            <h3 className="text-2xl font-bold leading-tight">🎉 {discount}% OFF — just for you!</h3>
            <p className="text-sm mt-1 opacity-90">Our AI noticed you're hesitating. Checkout now & save!</p>
            <button
              onClick={onClose}
              className="mt-3 w-full bg-slate-900 text-white font-bold py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Claim My Discount
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
