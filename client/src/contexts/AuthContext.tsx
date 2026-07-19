import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { supabase } from "@/config/supabase";
import type { Profile } from "@/types";
import type { User, Session } from "@supabase/supabase-js";

// ─── Demo Mode ───
// When Supabase isn't configured, enable demo login so the portal can be explored.
const IS_DEMO =
  !import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.VITE_SUPABASE_URL.includes("placeholder");

const DEMO_USER: User = {
  id: "demo-user-001",
  email: "demo@analytix-eng.com",
  app_metadata: {},
  user_metadata: { full_name: "Demo User" },
  aud: "authenticated",
  created_at: new Date().toISOString(),
} as User;

const DEMO_PROFILE: Profile = {
  id: "demo-user-001",
  email: "demo@analytix-eng.com",
  full_name: "Demo User",
  company: "Analytix Engineering SARL",
  phone: "+237 6 59 06 19 89",
  role: "admin",
  avatar_url: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isDemo: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ error: string | null }>;
  signInWithGoogle: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  isAdmin: boolean;
  isStaff: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile from Supabase
  const fetchProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Profile fetch error:", error.message);
      return null;
    }
    return data as Profile;
  }, []);

  // Listen for auth state changes (real mode only)
  useEffect(() => {
    if (IS_DEMO) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        fetchProfile(s.user.id).then(setProfile);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        const p = await fetchProfile(s.user.id);
        setProfile(p);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signIn = async (_email: string, _password: string) => {
    if (IS_DEMO) {
      setUser(DEMO_USER);
      setProfile(DEMO_PROFILE);
      return { error: null };
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: _email,
      password: _password,
    });
    return { error: error?.message ?? null };
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    if (IS_DEMO) {
      setUser(DEMO_USER);
      setProfile({ ...DEMO_PROFILE, full_name: fullName, email });
      return { error: null };
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return { error: error?.message ?? null };
  };

  const signInWithGoogle = async () => {
    if (IS_DEMO) {
      setUser(DEMO_USER);
      setProfile(DEMO_PROFILE);
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/portal` },
    });
  };

  const signInWithMicrosoft = async () => {
    if (IS_DEMO) {
      setUser(DEMO_USER);
      setProfile(DEMO_PROFILE);
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: `${window.location.origin}/portal`,
        scopes: "email profile openid",
      },
    });
  };

  const signOut = async () => {
    if (!IS_DEMO) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    if (IS_DEMO) {
      return { error: null };
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error: error?.message ?? null };
  };

  const role = profile?.role;

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        loading,
        isDemo: IS_DEMO,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithMicrosoft,
        signOut,
        resetPassword,
        isAdmin: role === "admin" || role === "super_admin",
        isStaff: role === "staff" || role === "admin" || role === "super_admin",
        isCustomer: role === "customer",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
