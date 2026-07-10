import { supabase } from "@/config/supabase";
import type { Project, Training, Enrollment, Document, Message } from "@/types";

// ─── Projects ───

export async function getCustomerProjects(
  customerId: string
): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Project[];
}

export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Project[];
}

// ─── Training ───

export async function getAvailableTrainings(): Promise<Training[]> {
  const { data, error } = await supabase
    .from("trainings")
    .select("*")
    .eq("is_active", true)
    .order("title");

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Training[];
}

export async function getCustomerEnrollments(
  customerId: string
): Promise<(Enrollment & { training: Training })[]> {
  const { data, error } = await supabase
    .from("enrollments")
    .select("*, training:trainings(*)")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as (Enrollment & { training: Training })[];
}

// ─── Documents ───

export async function getCustomerDocuments(
  customerId: string
): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("owner_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Document[];
}

export async function getDocumentDownloadUrl(
  filePath: string
): Promise<string> {
  const { data } = supabase.storage
    .from("documents")
    .getPublicUrl(filePath);
  return data.publicUrl;
}

// ─── Messages ───

export async function getMessages(userId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []) as unknown as Message[];
}

export async function sendMessage(
  senderId: string,
  recipientId: string,
  subject: string,
  body: string
): Promise<void> {
  const { error } = await supabase.from("messages").insert(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { sender_id: senderId, recipient_id: recipientId, subject, body, is_read: false } as any
  );

  if (error) throw new Error(error.message);
}

// ─── Contact Form ───

export async function submitContactForm(formData: {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}): Promise<void> {
  const { error } = await supabase.functions.invoke("contact-form", {
    body: formData,
  });

  if (error) throw new Error(error.message);
}

// ─── Admin: Stats ───

interface InvoiceRow { amount: number; status: string }
interface ProjectRow { status: string }
interface EnrollmentRow { status: string }
interface ProfileRow { role: string }

export async function getAdminStats() {
  const [invoicesRes, projectsRes, enrollmentsRes, profilesRes] = await Promise.all([
    supabase.from("invoices").select("amount, status"),
    supabase.from("projects").select("status"),
    supabase.from("enrollments").select("status"),
    supabase.from("profiles").select("role"),
  ]);

  const invoices = (invoicesRes.data ?? []) as unknown as InvoiceRow[];
  const projects = (projectsRes.data ?? []) as unknown as ProjectRow[];
  const enrollments = (enrollmentsRes.data ?? []) as unknown as EnrollmentRow[];
  const profiles = (profilesRes.data ?? []) as unknown as ProfileRow[];

  return {
    totalRevenue: invoices
      .filter((i) => i.status === "paid")
      .reduce((sum, i) => sum + i.amount, 0),
    pendingRevenue: invoices
      .filter((i) => i.status === "pending")
      .reduce((sum, i) => sum + i.amount, 0),
    activeProjects: projects.filter((p) => p.status === "active").length,
    totalTrainees: enrollments.length,
    certifiedTrainees: enrollments.filter((e) => e.status === "completed").length,
    totalCustomers: profiles.filter((p) => p.role === "customer").length,
  };
}
