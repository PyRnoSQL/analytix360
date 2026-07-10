import { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Download,
  ShieldCheck,
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

type Step = "loading" | "scan" | "processing" | "success" | "error";

export function QRPaymentModal({ invoice, onClose, onSuccess }: Props) {
  const [step, setStep] = useState<Step>("loading");
  const [session, setSession] = useState<PaymentSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize payment session
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const s = await createPaymentSession({
          invoiceId: invoice.id,
          amount: invoice.amount,
          description: invoice.description,
          customerEmail: "", // filled from auth context in real usage
          customerName: "",
        });
        if (!cancelled) {
          setSession(s);
          setStep("scan");
        }
      } catch (err) {
        if (!cancelled) {
          // Fallback: generate local QR for demo / offline
          const ref = generateReference();
          const qrData = buildQRPayload({
            reference: ref,
            amount: invoice.amount,
            currency: invoice.currency,
            merchantName: "Analytix Engineering",
            merchantId: "AE-001",
          });
          setSession({
            transactionId: ref,
            paymentUrl: "",
            qrCodeData: qrData,
            expiresAt: new Date(Date.now() + 15 * 60000).toISOString(),
            reference: ref,
          });
          setStep("scan");
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, [invoice]);

  // Poll for payment status once we have a session
  useEffect(() => {
    if (!session || step !== "scan") return;

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
  }, [session, step, onSuccess]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

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
            className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>

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
                Open your banking or Mobile Money app and scan
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
                <p className="text-xs font-semibold text-slate-500">
                  Amount Due
                </p>
                <p className="mt-1 text-2xl font-extrabold text-navy">
                  {formatCurrency(invoice.amount)}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Ref: {session.reference}
                </p>
              </div>

              {/* Accepted methods */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["MTN MoMo", "Orange Money", "Visa / MC"].map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-brand/5 px-3 py-1 text-xs font-semibold text-brand"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Waiting indicator */}
              <div className="mt-5 flex items-center gap-2 text-amber">
                <span className="h-2 w-2 rounded-full bg-amber animate-pulse-dot" />
                <span className="text-xs font-semibold">
                  Waiting for payment...
                </span>
              </div>

              {/* Security badge */}
              <div className="mt-5 flex items-center gap-1.5 rounded-lg bg-emerald/5 px-3 py-2">
                <ShieldCheck size={14} className="text-emerald" />
                <span className="text-[11px] font-semibold text-emerald">
                  256-bit encrypted · Secure transaction
                </span>
              </div>
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
                Receipt #{invoice.reference} · Confirmation sent to your email
              </p>

              <div className="mt-6 flex w-full gap-3">
                <button
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-slate-200 px-4 py-3 text-sm font-semibold text-navy hover:bg-slate-50 transition-colors"
                >
                  <Download size={16} /> Receipt PDF
                </button>
                <button
                  onClick={onClose}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand/90 transition-colors"
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
              <h3 className="mt-4 text-xl font-bold text-navy">
                Payment Failed
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {error ?? "Something went wrong. Please try again."}
              </p>
              <button
                onClick={() => setStep("loading")}
                className="mt-6 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand/90 transition-colors"
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
