import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

interface Props {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: Props) {
  const { signIn, signInWithGoogle, signInWithMicrosoft } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    const { error } = await signIn(data.email, data.password);
    if (error) {
      setServerError(error);
    } else {
      onSuccess?.();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl"
    >
      {/* Header */}
      <div className="mb-8 text-center">
        <img
          src="/logo.png"
          alt="Analytix Engineering SARL"
          className="mx-auto mb-4 h-14 w-auto"
        />
        <h2 className="text-2xl font-extrabold text-navy">Customer Portal</h2>
        <p className="mt-2 text-sm text-slate-500">
          Access your projects, invoices, and training records
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="rounded-xl bg-rose/5 p-3 text-center text-sm font-medium text-rose">
            {serverError}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-500">
            Email
          </label>
          <div
            className={`flex items-center gap-3 rounded-xl border-2 bg-pearl px-4 py-3 transition-colors ${
              errors.email ? "border-rose" : "border-slate-200 focus-within:border-brand"
            }`}
          >
            <Mail size={18} className="text-slate-400" />
            <input
              {...register("email")}
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-rose">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-slate-500">
            Password
          </label>
          <div
            className={`flex items-center gap-3 rounded-xl border-2 bg-pearl px-4 py-3 transition-colors ${
              errors.password ? "border-rose" : "border-slate-200 focus-within:border-brand"
            }`}
          >
            <Lock size={18} className="text-slate-400" />
            <input
              {...register("password")}
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              className="flex-1 bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-rose">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign In"} <ArrowRight size={16} />
        </button>

        <div className="text-center">
          <button
            type="button"
            className="text-xs font-semibold text-brand hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400">or</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      {/* OAuth */}
      <div className="space-y-3">
        <button
          onClick={signInWithGoogle}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-navy transition-colors hover:bg-slate-100"
        >
          Sign in with Google
        </button>
        <button
          onClick={signInWithMicrosoft}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-navy transition-colors hover:bg-slate-100"
        >
          Sign in with Microsoft
        </button>
      </div>

      {/* Register link */}
      {onSwitchToRegister && (
        <p className="mt-6 text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToRegister}
            className="font-semibold text-brand hover:underline"
          >
            Request access
          </button>
        </p>
      )}

      {/* Security badge */}
      <div className="mt-6 flex items-center justify-center gap-1.5 rounded-lg bg-emerald/5 px-3 py-2">
        <ShieldCheck size={14} className="text-emerald" />
        <span className="text-[11px] font-semibold text-emerald">
          256-bit SSL encrypted · SOC 2 compliant
        </span>
      </div>
    </motion.div>
  );
}
