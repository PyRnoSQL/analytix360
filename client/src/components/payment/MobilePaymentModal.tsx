import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Smartphone, CheckCircle2, Copy, ShieldCheck, ArrowLeft, Loader2,
} from "lucide-react";

// ─── Payment Recipients ───
const PAYMENT_METHODS = [
  {
    id: "mtn_momo",
    name: "MTN Mobile Money",
    shortName: "MTN MoMo",
    number: "+237 6 51 32 18 78",
    recipientName: "Analytix Engineering",
    color: "#FFCC00",
    textColor: "#000",
    bgLight: "#FFCC0015",
    instructions: [
      "Dial *126# on your MTN phone",
      "Select \"Transfer Money\"",
      "Enter the number: 651 32 18 78",
      "Enter the exact amount shown below",
      "Confirm with your MoMo PIN",
      "Note the Transaction ID from your SMS confirmation",
    ],
  },
  {
    id: "orange_money",
    name: "Orange Money",
    shortName: "Orange Money",
    number: "+237 6 59 06 19 89",
    recipientName: "Analytix Engineering",
    color: "#FF6600",
    textColor: "#FFF",
    bgLight: "#FF660015",
    instructions: [
      "Dial #150*1*1# on your Orange phone",
      "Select \"Transfer\"",
      "Enter the number: 659 06 19 89",
      "Enter the exact amount shown below",
      "Confirm with your Orange Money PIN",
      "Note the Transaction ID from your SMS confirmation",
    ],
  },
];

// ─── Types ───
interface PaymentInfo {
  description: string;
  amount: number;
  reference: string;
}

interface Props {
  payment: PaymentInfo;
  onClose: () => void;
  onSubmit: (data: { method: string; transactionId: string; phone: string }) => void;
}

type Step = "select" | "instructions" | "confirm" | "submitted";

function formatXAF(amount: number) {
  return new Intl.NumberFormat("fr-CM", { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(amount);
}

export function MobilePaymentModal({ payment, onClose, onSubmit }: Props) {
  const [step, setStep] = useState<Step>("select");
  const [method, setMethod] = useState<typeof PAYMENT_METHODS[number] | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text.replace(/\s/g, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async () => {
    if (!transactionId.trim() || !senderPhone.trim() || !method) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    onSubmit({
      method: method.id,
      transactionId: transactionId.trim(),
      phone: senderPhone.trim(),
    });
    setStep("submitted");
    setSubmitting(false);
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
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-3xl bg-slate-50 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button onClick={onClose} className="absolute right-4 top-4 z-10 rounded-full p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-600">
            <X size={20} />
          </button>

          <div className="p-7">
            {/* ─── Step 1: Select Method ─── */}
            {step === "select" && (
              <div>
                <h3 className="text-xl font-extrabold text-navy">Pay with Mobile Money</h3>
                <p className="mt-1 text-sm text-slate-500">Choose your payment method</p>

                {/* Amount */}
                <div className="mt-5 rounded-xl bg-slate-100 p-4 text-center">
                  <p className="text-xs font-semibold text-slate-500">Amount to Pay</p>
                  <p className="mt-1 text-3xl font-extrabold text-navy">{formatXAF(payment.amount)}</p>
                  <p className="mt-1 text-xs text-slate-400">{payment.description}</p>
                  <p className="mt-0.5 text-[10px] font-mono text-slate-400">Ref: {payment.reference}</p>
                </div>

                {/* Methods */}
                <div className="mt-5 space-y-3">
                  {PAYMENT_METHODS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => { setMethod(m); setStep("instructions"); }}
                      className="flex w-full items-center gap-4 rounded-2xl border-2 border-slate-200 p-4 text-left transition-all hover:border-slate-300 hover:shadow-md"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: m.color }}>
                        <Smartphone size={22} style={{ color: m.textColor }} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-navy">{m.name}</p>
                        <p className="text-xs text-slate-400">Send to {m.number}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500/5 px-3 py-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span className="text-[11px] font-semibold text-emerald-600">Secure direct transfer — no intermediary fees</span>
                </div>
              </div>
            )}

            {/* ─── Step 2: Instructions ─── */}
            {step === "instructions" && method && (
              <div>
                <button onClick={() => { setStep("select"); setMethod(null); }} className="mb-4 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand">
                  <ArrowLeft size={14} /> Back
                </button>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: method.color }}>
                    <Smartphone size={20} style={{ color: method.textColor }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-navy">{method.name}</h3>
                    <p className="text-xs text-slate-400">Follow the steps below</p>
                  </div>
                </div>

                {/* Recipient Number */}
                <div className="mt-5 rounded-xl p-4" style={{ backgroundColor: method.bgLight }}>
                  <p className="text-xs font-semibold text-slate-500">Send to this number:</p>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-2xl font-extrabold text-navy">{method.number}</p>
                    <button
                      onClick={() => handleCopy(method.number)}
                      className="flex items-center gap-1 rounded-lg bg-slate-200 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-300"
                    >
                      <Copy size={12} /> {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Name: {method.recipientName}</p>
                </div>

                {/* Amount */}
                <div className="mt-3 rounded-xl bg-slate-100 p-4 text-center">
                  <p className="text-xs font-semibold text-slate-500">Exact amount to send</p>
                  <p className="mt-1 text-2xl font-extrabold text-navy">{formatXAF(payment.amount)}</p>
                </div>

                {/* Steps */}
                <div className="mt-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Steps</p>
                  <div className="space-y-2">
                    {method.instructions.map((instr, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: method.color, color: method.textColor }}>
                          {i + 1}
                        </span>
                        <p className="text-sm text-slate-600">{instr}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep("confirm")}
                  className="mt-6 w-full rounded-xl py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: method.color, color: method.textColor }}
                >
                  I've Sent the Money
                </button>
              </div>
            )}

            {/* ─── Step 3: Confirm Transaction ─── */}
            {step === "confirm" && method && (
              <div>
                <button onClick={() => setStep("instructions")} className="mb-4 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand">
                  <ArrowLeft size={14} /> Back
                </button>

                <h3 className="text-lg font-extrabold text-navy">Confirm Your Payment</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the details from your {method.shortName} confirmation SMS
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">Transaction ID / Reference</label>
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      placeholder="e.g. TXN123456789"
                      className="w-full rounded-xl border-2 border-slate-200 bg-slate-100 px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none"
                    />
                    <p className="mt-1 text-[10px] text-slate-400">Found in the SMS you received after sending money</p>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">Your Phone Number</label>
                    <input
                      type="tel"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      placeholder="e.g. +237 6XX XXX XXX"
                      className="w-full rounded-xl border-2 border-slate-200 bg-slate-100 px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none"
                    />
                    <p className="mt-1 text-[10px] text-slate-400">The number you sent the payment from</p>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-5 rounded-xl bg-slate-100 p-4 space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Method</span><span className="font-bold text-navy">{method.shortName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Amount</span><span className="font-bold text-navy">{formatXAF(payment.amount)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Sent to</span><span className="font-bold text-navy">{method.number}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Reference</span><span className="font-mono font-bold text-navy">{payment.reference}</span></div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!transactionId.trim() || !senderPhone.trim() || submitting}
                  className="mt-5 w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600 disabled:opacity-50"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Submitting...</span>
                  ) : (
                    "Submit Payment Confirmation"
                  )}
                </button>
              </div>
            )}

            {/* ─── Step 4: Submitted ─── */}
            {step === "submitted" && method && (
              <div className="py-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10"
                >
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </motion.div>

                <h3 className="mt-5 text-2xl font-extrabold text-navy">Payment Submitted!</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Your payment is being verified. You'll receive confirmation within 24 hours.
                </p>

                <div className="mt-5 rounded-xl bg-slate-100 p-4 space-y-2 text-xs text-left">
                  <div className="flex justify-between"><span className="text-slate-500">Method</span><span className="font-bold text-navy">{method.shortName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Amount</span><span className="font-bold text-navy">{formatXAF(payment.amount)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Transaction ID</span><span className="font-mono font-bold text-navy">{transactionId}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Status</span><span className="font-bold text-amber-500">Pending Verification</span></div>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  We'll confirm your payment via SMS and email. If you don't hear from us within 24 hours,
                  contact us via WhatsApp at +237 6 59 06 19 89
                </p>

                <button
                  onClick={onClose}
                  className="mt-5 w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-white hover:bg-brand/90"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
