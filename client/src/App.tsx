import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { PublicLayout } from "@/layouts/PublicLayout";
import { PortalLayout } from "@/layouts/PortalLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

// Lazy-loaded pages (code splitting)
const HomePage = lazy(() => import("@/pages/public/HomePage").then(m => ({ default: m.HomePage })));
const ServicesPage = lazy(() => import("@/pages/public/ServicesPage").then(m => ({ default: m.ServicesPage })));
const AboutPage = lazy(() => import("@/pages/public/AboutPage").then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import("@/pages/public/ContactPage").then(m => ({ default: m.ContactPage })));
const IndustryPage = lazy(() => import("@/pages/public/IndustryPage").then(m => ({ default: m.IndustryPage })));
const VerifyCertificatePage = lazy(() => import("@/pages/public/VerifyCertificatePage").then(m => ({ default: m.VerifyCertificatePage })));
const LoginPage = lazy(() => import("@/pages/public/LoginPage").then(m => ({ default: m.LoginPage })));
const PortalDashboard = lazy(() => import("@/pages/portal/Dashboard").then(m => ({ default: m.PortalDashboard })));
const PortalInvoices = lazy(() => import("@/pages/portal/Invoices").then(m => ({ default: m.PortalInvoices })));
const PortalTraining = lazy(() => import("@/pages/portal/Training").then(m => ({ default: m.PortalTraining })));
const PortalDocuments = lazy(() => import("@/pages/portal/Documents").then(m => ({ default: m.PortalDocuments })));
const PortalSettings = lazy(() => import("@/pages/portal/Settings").then(m => ({ default: m.PortalSettings })));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const FinancialDashboard = lazy(() => import("@/pages/admin/FinancialDashboard").then(m => ({ default: m.FinancialDashboard })));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60_000, retry: 1 } },
});

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent" />
        <p className="text-sm font-medium text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/industries/:slug" element={<IndustryPage />} />
                <Route path="/verify" element={<VerifyCertificatePage />} />
                <Route path="/verify/:certId" element={<VerifyCertificatePage />} />
              </Route>

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />

              {/* Customer Portal */}
              <Route element={<ProtectedRoute><PortalLayout /></ProtectedRoute>}>
                <Route path="/portal" element={<PortalDashboard />} />
                <Route path="/portal/invoices" element={<PortalInvoices />} />
                <Route path="/portal/training" element={<PortalTraining />} />
                <Route path="/portal/documents" element={<PortalDocuments />} />
                <Route path="/portal/settings" element={<PortalSettings />} />
              </Route>

              {/* Admin */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "super_admin"]}><AdminLayout /></ProtectedRoute>}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/financial" element={<FinancialDashboard />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-extrabold text-navy">404</h1>
                    <p className="mt-3 text-slate-500">Page not found</p>
                    <a href="/" className="mt-6 inline-block rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white">Go Home</a>
                  </div>
                </div>
              } />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
