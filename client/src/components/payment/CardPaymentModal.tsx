import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Loader2, ArrowLeft, Mail, Phone, User } from "lucide-react";

interface Props {
  productName: string;
  amount: number;
  chariowProductId: string;
  onClose: () => void;
}

function formatXAF(amount: number) {
  return new Intl.NumberFormat("fr-CM", { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(amount);
}

export function CardPaymentModal({ productName, amount, chariowProductId, onClose }: Props) {
  const [step, setStep] = useState<"form" | "redirecting" | "error">("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) return;
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/chariow/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: chariowProductId,
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
          countryCode: "CM",
        }),
      });

      const data = await res.json();

      if (data.checkoutUrl) {
        setStep("redirecting");
        window.location.href = data.checkoutUrl;
      } else if (data.status === "completed") {
        alert("You have already been enrolled in this course!");
        onClose();
      } else if (data.status === "already_purchased") {
        alert("You have already purchased this course.");
        onClose();
      } else {
        setErrorMsg(data.error || "Checkout failed. Please try again.");
        setStep("error");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setErrorMsg("Network error. Please check your connection and try again.");
      setStep("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-200">
            <X size={20} />
          </button>

          <div className="p-7">
            {/* Form Step */}
            {step === "form" && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
                    <CreditCard size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-navy">Pay with Card</h3>
                    <p className="text-xs text-slate-400">Visa, Mastercard, international cards</p>
                  </div>
                </div>

                {/* Amount */}
                <div className="rounded-xl bg-slate-100 p-4 text-center mb-5">
                  <p className="text-xs font-semibold text-slate-500">Amount to Pay</p>
                  <p className="mt-1 text-3xl font-extrabold text-navy">{formatXAF(amount)}</p>
                  <p className="mt-1 text-xs text-slate-400">{productName}</p>
                </div>

                {/* Customer Info Form */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">First Name</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-3 text-slate-400" />
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John"
                          className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-navy focus:border-brand focus:outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">Last Name</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3 top-3 text-slate-400" />
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe"
                          className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-navy focus:border-brand focus:outline-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">Email</label>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-3 text-slate-400" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com"
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-navy focus:border-brand focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">Phone (optional)</label>
                    <div className="relative">
                      <Phone size={14} className="absolute left-3 top-3 text-slate-400" />
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+237 6XX XXX XXX"
                        className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 pl-9 pr-3 py-2.5 text-sm text-navy focus:border-brand focus:outline-none" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!firstName.trim() || !lastName.trim() || !email.trim() || loading}
                  className="mt-5 w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white transition-all hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Processing...</span>
                  ) : (
                    `Pay ${formatXAF(amount)} with Card`
                  )}
                </button>

                <p className="mt-3 text-center text-[10px] text-slate-400">
                  Secure payment processed by Chariow. Visa, Mastercard, and international cards accepted.
                </p>
              </div>
            )}

            {/* Redirecting */}
            {step === "redirecting" && (
              <div className="py-8 text-center">
                <Loader2 size={40} className="mx-auto animate-spin text-indigo-600" />
                <h3 className="mt-4 text-lg font-extrabold text-navy">Redirecting to Payment...</h3>
                <p className="mt-2 text-sm text-slate-500">You're being redirected to the secure payment page.</p>
              </div>
            )}

            {/* Error */}
            {step === "error" && (
              <div className="py-4 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                  <X size={30} className="text-rose-500" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-navy">Payment Error</h3>
                <p className="mt-2 text-sm text-slate-500">{errorMsg}</p>
                <button onClick={() => setStep("form")}
                  className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-navy hover:bg-slate-200">
                  <ArrowLeft size={14} /> Try Again
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
