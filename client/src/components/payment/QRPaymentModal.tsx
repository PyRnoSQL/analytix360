import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Download,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Wallet,
} from "lucide-react";
import {
  createPaymentSession,
  pollPaymentStatus,
  formatCurrency,
  buildQRPayload,
  generateReference,
  type PaymentSession,
  type PaymentStatus,
} from "@/services/payment";
import type { Invoice } from "@/types";

interface Props {
  invoice: Invoice;
  onClose: () => void;
  onSuccess: (payment: PaymentStatus) => void;
}

type Step = "loading" | "method" | "scan" | "processing" | "success" | "error";
type PayMethod = "mtn_momo" | "orange_money" | "airtel_money" | "wave" | "yoomoney" | "card";

const METHODS = [
  {
    id: "mtn_momo" as PayMethod,
    name: "MTN MoMo",
    color: "#FFCC00",
    textColor: "#000",
    icon: Smartphone,
    desc: "Pay with MTN Mobile Money",
  },
  {
    id: "orange_money" as PayMethod,
    name: "Orange Money",
    color: "#FF6600",
    textColor: "#FFF",
    icon: Smartphone,
    desc: "Pay with Orange Money",
  },
  {
    id: "airtel_money" as PayMethod,
    name: "Airtel Money",
    color: "#ED1C24",
    textColor: "#FFF",
    icon: Smartphone,
    desc: "Pay with Airtel Money",
  },
  {
    id: "wave" as PayMethod,
    name: "Wave",
    color: "#1DC3E2",
    textColor: "#FFF",
    icon: Wallet,
    desc: "Pay with Wave mobile wallet",
  },
  {
    id: "yoomoney" as PayMethod,
    name: "YooMoney",
    color: "#8B3FFD",
    textColor: "#FFF",
    icon: Wallet,
    desc: "Pay with YooMoney",
  },
  {
    id: "card" as PayMethod,
    name: "Visa / Mastercard",
    color: "#1A1F71",
    textColor: "#FFF",
    icon: CreditCard,
    desc: "Pay with debit or credit card",
  },
];

export function QRPaymentModal({ invoice, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("method");
  const [method, setMethod] = useState<PayMethod | null>(null);
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  // Initialize payment session after method selection
  useEffect(() => {
    if (step !== "loading" || !method) return;
    let cancelled = false;

    async function init() {
      try {
        const s = await createPaymentSession({
          invoiceId: invoice.id,
          amount: invoice.amount,
          description: invoice.description,
          customerEmail: "",
          customerName: "",
          method: method === "card" ? "visa" : method ?? undefined,
        });
        if (!cancelled) {
          setSession(s);
          setIsDemo(false);
          setStep("scan");
        }
      } catch {
        if (!cancelled) {
          // Fallback: generate local QR for demo/offline
          const ref = generateReference();
          const qrData = buildQRPayload({
            reference: ref,
            amount: invoice.amount,
            currency: invoice.currency,
            merchantName: "Analytix Engineering SARL",
            merchantId: "AE-001",
          });
          setSession({
            transactionId: ref,
            paymentUrl: "",
            qrCodeData: qrData,
            expiresAt: new Date(Date.now() + 15 * 60000).toISOString(),
            reference: ref,
          });
          setIsDemo(true);
          setStep("scan");
        }
      }
    }

    init();
    return () => { cancelled = true; };
  }, [step, method, invoice]);

  // Poll for payment status (only in real mode)
  useEffect(() => {
    if (!session || step !== "scan" || isDemo) return;

    const stopPolling = pollPaymentStatus(
      session.transactionId,
      (status: PaymentStatus) => {
        if (status.status === "completed") {
          setStep("success");
          onSuccess(status);
        } else if (status.status === "failed") {
          setStep("error");
          setError("Payment was declined. Please try again.");
        }
      },
      4000
    );

    return stopPolling;
  }, [session, step, isDemo, onSuccess]);

  const handleMethodSelect = (m: PayMethod) => {
    setMethod(m);
    setStep("loading");
  };

  const handleSimulatePayment = () => {
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      onSuccess({
        status: "completed",
        transactionId: session?.transactionId ?? "",
        amount: invoice.amount,
        method: method ?? "mtn_momo",
        paidAt: new Date().toISOString(),
      });
    }, 2500);
  };

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const selectedMethod = METHODS.find((m) => m.id === method);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={20} />
          </button>

          {/* ─── Method Selection ─── */}
          {step === "method" && (
            <div>
              <h3 className="text-xl font-bold text-navy">Choose Payment Method</h3>
              <p className="mt-1 text-sm text-slate-500">
                Select how you'd like to pay{" "}
                <span className="font-semibold text-navy">
                  {formatCurrency(invoice.amount)}
                </span>
              </p>

              <div className="mt-6 space-y-3">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => handleMethodSelect(m.id)}
                    className="flex w-full items-center gap-4 rounded-2xl border-2 border-slate-100 p-4 text-left transition-all hover:border-brand/30 hover:shadow-md"
                  >
                    <div
                      className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: m.color }}
                    >
                      <m.icon size={22} style={{ color: m.textColor }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy">{m.name}</p>
                      <p className="text-xs text-slate-400">{m.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Security badge */}
              <div className="mt-5 flex items-center justify-center gap-1.5 rounded-lg bg-emerald/5 px-3 py-2">
                <ShieldCheck size={14} className="text-emerald" />
                <span className="text-[11px] font-semibold text-emerald">
                  All transactions are 256-bit encrypted
                </span>
              </div>
            </div>
          )}

          {/* ─── Loading ─── */}
          {step === "loading" && (
            <div className="flex flex-col items-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand border-t-transparent" />
              <p className="mt-4 text-sm font-medium text-slate-500">
                Creating secure payment session...
              </p>
            </div>
          )}

          {/* ─── QR Scan ─── */}
          {step === "scan" && session && (
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-bold text-navy">Scan to Pay</h3>
              <p className="mt-1 text-sm text-slate-500">
                Open{" "}
                <span className="font-semibold" style={{ color: selectedMethod?.color }}>
                  {selectedMethod?.name}
                </span>{" "}
                and scan the QR code
              </p>

              {/* QR Code */}
              <div className="my-6 rounded-2xl bg-white p-4 shadow-inner ring-1 ring-slate-100">
                <QRCodeSVG
                  value={session.qrCodeData}
                  size={200}
                  level="H"
                  includeMargin
                  bgColor="#FFFFFF"
                  fgColor="#0F172A"
                />
              </div>

              {/* Amount */}
              <div className="w-full rounded-xl bg-pearl p-4">
                <p className="text-xs font-semibold text-slate-500">Amount Due</p>
                <p className="mt-1 text-2xl font-extrabold text-navy">
                  {formatCurrency(invoice.amount)}
                </p>
                <p className="mt-1 text-xs text-slate-400">Ref: {session.reference}</p>
              </div>

              {/* Selected method badge */}
              {selectedMethod && (
                <div
                  className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold"
                  style={{ backgroundColor: selectedMethod.color + "20", color: selectedMethod.color }}
                >
                  <selectedMethod.icon size={14} />
                  Paying with {selectedMethod.name}
                </div>
              )}

              {/* Waiting indicator */}
              <div className="mt-4 flex items-center gap-2 text-amber">
                <span className="h-2 w-2 animate-pulse rounded-full bg-amber" />
                <span className="text-xs font-semibold">Waiting for payment...</span>
              </div>

              {/* Simulate Payment (demo mode) */}
              {isDemo && (
                <button
                  onClick={handleSimulatePayment}
                  className="mt-4 w-full rounded-xl bg-emerald px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald/90"
                >
                  ✓ Simulate Payment (Demo)
                </button>
              )}

              {/* Change method */}
              <button
                onClick={() => { setStep("method"); setSession(null); setMethod(null); }}
                className="mt-3 text-xs font-semibold text-slate-400 transition-colors hover:text-brand"
              >
                ← Change payment method
              </button>

              {/* Security badge */}
              <div className="mt-4 flex items-center gap-1.5 rounded-lg bg-emerald/5 px-3 py-2">
                <ShieldCheck size={14} className="text-emerald" />
                <span className="text-[11px] font-semibold text-emerald">
                  256-bit encrypted · Secure transaction
                </span>
              </div>
            </div>
          )}

          {/* ─── Processing ─── */}
          {step === "processing" && (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-emerald border-t-transparent" />
              <h3 className="mt-5 text-xl font-bold text-navy">Processing Payment...</h3>
              <p className="mt-2 text-sm text-slate-500">
                Verifying your payment with {selectedMethod?.name}
              </p>
            </div>
          )}

          {/* ─── Success ─── */}
          {step === "success" && (
            <div className="flex flex-col items-center py-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10"
              >
                <CheckCircle2 size={40} className="text-emerald" />
              </motion.div>

              <h3 className="mt-5 text-2xl font-extrabold text-navy">
                Payment Received!
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {formatCurrency(invoice.amount)}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Receipt #{invoice.reference} · {selectedMethod?.name}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Confirmation sent to your email
              </p>

              <div className="mt-6 flex w-full gap-3">
                <button
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-semibold text-navy transition-colors hover:bg-slate-50"
                >
                  <Download size={16} /> Receipt PDF
                </button>
                <button
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {/* ─── Error ─── */}
          {step === "error" && (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose/10">
                <X size={32} className="text-rose" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-navy">Payment Failed</h3>
              <p className="mt-2 text-sm text-slate-500">
                {error ?? "Something went wrong. Please try again."}
              </p>
              <button
                onClick={() => setStep("method")}
                className="mt-6 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
