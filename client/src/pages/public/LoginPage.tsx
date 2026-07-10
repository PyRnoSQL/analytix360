import { useNavigate, useLocation } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? "/portal";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-midnight via-navy to-royal p-6 pt-20">
      <LoginForm
        onSuccess={() => navigate(from, { replace: true })}
        onSwitchToRegister={() => navigate("/contact")}
      />
    </div>
  );
}
