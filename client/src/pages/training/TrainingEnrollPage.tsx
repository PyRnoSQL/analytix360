import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, ArrowRight, ArrowLeft, CheckCircle2, Shield,
  User, Mail, Phone, CreditCard, Smartphone, Lock,
  BookOpen, Clock, Award, Copy, Eye, EyeOff,
} from "lucide-react";

// ─── Course Catalog (synced with AcademyPage programs) ───
const COURSES = [
  { id: "lssyb", title: "Lean Six Sigma Yellow Belt", acronym: "LSSYB", category: "Operational Excellence", catColor: "#059669", duration: "5 weeks", hours: 40, modules: 5, standardPrice: 500000, bootcampPrice: 300000, hasBootcamp: true },
  { id: "lssgb", title: "Lean Six Sigma Green Belt", acronym: "LSSGB", category: "Operational Excellence", catColor: "#059669", duration: "10 weeks", hours: 90, modules: 7, standardPrice: 1000000, bootcampPrice: 500000, hasBootcamp: true },
  { id: "qt", title: "Quality Technician", acronym: "QT", category: "Quality Engineering", catColor: "#7C3AED", duration: "7 weeks", hours: 60, modules: 5, standardPrice: 500000, bootcampPrice: 300000, hasBootcamp: true },
  { id: "qea", title: "Quality Engineer Associate", acronym: "QEA", category: "Quality Engineering", catColor: "#7C3AED", duration: "11 weeks", hours: 100, modules: 7, standardPrice: 1000000, bootcampPrice: 550000, hasBootcamp: true },
  { id: "lqms", title: "Laboratory Quality Management Specialist", acronym: "LQMS", category: "Quality Engineering", catColor: "#7C3AED", duration: "9 weeks", hours: 80, modules: 7, standardPrice: 700000, bootcampPrice: 0, hasBootcamp: false },
  { id: "mas", title: "Marketing Analytics Specialist", acronym: "MAS", category: "Data Analytics & BI", catColor: "#2563EB", duration: "14 weeks", hours: 112, modules: 8, standardPrice: 700000, bootcampPrice: 400000, hasBootcamp: true },
  { id: "sids", title: "Statistics: Informed Decisions Using Data", acronym: "SIDS", category: "Data Analytics & BI", catColor: "#2563EB", duration: "12 weeks", hours: 96, modules: 8, standardPrice: 400000, bootcampPrice: 200000, hasBootcamp: true },
  { id: "dea", title: "Data Engineering Associate", acronym: "DEA", category: "Data Analytics & BI", catColor: "#2563EB", duration: "12 weeks", hours: 96, modules: 8, standardPrice: 1000000, bootcampPrice: 400000, hasBootcamp: true },
  { id: "das", title: "Data Analytics Specialist", acronym: "DAS", category: "Data Analytics & BI", catColor: "#2563EB", duration: "9 weeks", hours: 80, modules: 6, standardPrice: 400000, bootcampPrice: 200000, hasBootcamp: true },
  { id: "meal-cert", title: "MEAL Professional Certificate", acronym: "MEALPC", category: "MEAL & Impact Evaluation", catColor: "#0891B2", duration: "14 weeks", hours: 140, modules: 7, standardPrice: 400000, bootcampPrice: 250000, hasBootcamp: true },
];

type Step = "select" | "info" | "language" | "schedule" | "payment" | "credentials";

function formatXAF(amount: number) {
  return new Intl.NumberFormat("fr-CM", { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(amount);
}

function generateStudentId(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(Math.random() * 99999).toString().padStart(5, "0");
  return `AE-STU-${year}-${seq}`;
}

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  let pwd = "";
  for (let i = 0; i < 12; i++) pwd += chars[Math.floor(Math.random() * chars.length)];
  return pwd;
}

export function TrainingEnrollPage() {
  const [step, setStep] = useState<Step>("select");
  const [selectedCourse, setSelectedCourse] = useState<typeof COURSES[number] | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organization, setOrganization] = useState("");
  const [language, setLanguage] = useState<"en" | "fr" | null>(null);
  const [schedule, setSchedule] = useState<"standard" | "bootcamp" | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<"momo" | "orange" | "card" | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [studentId, setStudentId] = useState("");
  const [studentPassword, setStudentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  const categories = [...new Set(COURSES.map(c => c.category))];
  const filteredCourses = filterCategory ? COURSES.filter(c => c.category === filterCategory) : COURSES;
  const totalAmount = selectedCourse ? (schedule === "bootcamp" ? selectedCourse.bootcampPrice : selectedCourse.standardPrice) : 0;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handlePaymentSubmit = () => {
    const sid = generateStudentId();
    const pwd = generatePassword();
    setStudentId(sid);
    setStudentPassword(pwd);
    // TODO: When Supabase connected, save enrollment to database
    // await supabase.from('enrollments').insert({ student_id: sid, ... })
    setStep("credentials");
  };

  const stepIndex = ["select", "info", "language", "schedule", "payment", "credentials"].indexOf(step);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-midnight via-navy to-royal px-6 pb-8 pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
            <GraduationCap size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-white">Training Institute Enrollment</h1>
          <p className="mt-2 text-sm text-white/60">Select your program, complete registration, and start learning</p>
        </div>
      </section>

      {/* Progress Steps */}
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          {["Select Course", "Your Info", "Language", "Schedule", "Payment", "Access"].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                i < stepIndex ? "bg-emerald-500 text-white" :
                i === stepIndex ? "bg-brand text-white" :
                "bg-slate-200 text-slate-400"
              }`}>
                {i < stepIndex ? <CheckCircle2 size={14} /> : i + 1}
              </div>
              <span className={`hidden text-xs font-semibold sm:block ${i === stepIndex ? "text-navy" : "text-slate-400"}`}>{label}</span>
              {i < 5 && <div className="hidden h-px w-4 bg-slate-200 sm:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <AnimatePresence mode="wait">
          {/* ═══ STEP 1: Select Course ═══ */}
          {step === "select" && (
            <motion.div key="select" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h2 className="text-2xl font-extrabold text-navy">Choose Your Training Program</h2>
              <p className="mt-1 text-sm text-slate-500">Select the certification program you want to enroll in</p>

              {/* Category Filter */}
              <div className="mt-6 flex flex-wrap gap-2">
                <button onClick={() => setFilterCategory(null)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${!filterCategory ? "bg-navy text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>All Programs</button>
                {categories.map(cat => (
                  <button key={cat} onClick={() => setFilterCategory(cat)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${filterCategory === cat ? "bg-navy text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{cat}</button>
                ))}
              </div>

              {/* Course Grid */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {filteredCourses.map(course => (
                  <button key={course.id} onClick={() => { setSelectedCourse(course); setStep("info"); }}
                    className="group flex flex-col rounded-2xl border-2 border-slate-200 bg-white p-5 text-left transition-all hover:border-brand hover:shadow-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ backgroundColor: course.catColor }}>{course.category}</span>
                        <h3 className="mt-2 text-base font-extrabold text-navy">{course.title}</h3>
                        <p className="text-xs font-bold text-slate-400">{course.acronym}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><BookOpen size={11} /> {course.modules} modules</span>
                      <span className="flex items-center gap-1"><Award size={11} /> Certificate</span>
                    </div>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-navy">{formatXAF(course.standardPrice)}</span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-brand opacity-0 group-hover:opacity-100 transition-opacity">Select <ArrowRight size={12} /></span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Link to="/institute" className="text-xs font-semibold text-brand hover:underline">View detailed curriculum for all programs →</Link>
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 2: Student Information ═══ */}
          {step === "info" && selectedCourse && (
            <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep("select")} className="mb-4 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand"><ArrowLeft size={14} /> Back</button>
              <h2 className="text-2xl font-extrabold text-navy">Student Information</h2>
              <p className="mt-1 text-sm text-slate-500">Enrolling in: <span className="font-bold text-brand">{selectedCourse.title}</span></p>

              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">First Name *</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-3.5 text-slate-400" />
                      <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="John"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white pl-9 pr-4 py-3 text-sm text-navy focus:border-brand focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">Last Name *</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-3.5 text-slate-400" />
                      <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Doe"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white pl-9 pr-4 py-3 text-sm text-navy focus:border-brand focus:outline-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Email Address *</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-3.5 text-slate-400" />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="john.doe@example.com"
                      className="w-full rounded-xl border-2 border-slate-200 bg-white pl-9 pr-4 py-3 text-sm text-navy focus:border-brand focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Phone Number *</label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-3.5 text-slate-400" />
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+237 6XX XXX XXX"
                      className="w-full rounded-xl border-2 border-slate-200 bg-white pl-9 pr-4 py-3 text-sm text-navy focus:border-brand focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-600">Organization (optional)</label>
                  <input type="text" value={organization} onChange={e => setOrganization(e.target.value)} placeholder="Company or institution name"
                    className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none" />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-100 p-3">
                <Shield size={14} className="text-emerald-500 flex-shrink-0" />
                <p className="text-[11px] text-slate-500">Your information is secured and will only be used for enrollment and certification purposes.</p>
              </div>

              <button onClick={() => setStep("language")} disabled={!firstName || !lastName || !email || !phone}
                className="mt-6 flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-brand/90">
                Continue <ArrowRight size={14} />
              </button>
            </motion.div>
          )}

          {/* ═══ STEP 3: Language Selection ═══ */}
          {step === "language" && (
            <motion.div key="language" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep("info")} className="mb-4 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand"><ArrowLeft size={14} /> Back</button>
              <h2 className="text-2xl font-extrabold text-navy">Select Language of Instruction</h2>
              <p className="mt-1 text-sm text-slate-500">Choose your preferred language for course materials, quizzes, and certificate</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button onClick={() => setLanguage("en")}
                  className={`rounded-2xl border-2 p-6 text-left transition-all hover:shadow-md ${language === "en" ? "border-brand bg-brand/5" : "border-slate-200 bg-white"}`}>
                  <span className="text-4xl">🇬🇧</span>
                  <h3 className="mt-3 text-xl font-extrabold text-navy">English</h3>
                  <p className="mt-1 text-xs text-slate-400">Course materials, quizzes, assignments, and certificate in English</p>
                  {language === "en" && <CheckCircle2 size={20} className="mt-3 text-brand" />}
                </button>

                <button onClick={() => setLanguage("fr")}
                  className={`rounded-2xl border-2 p-6 text-left transition-all hover:shadow-md ${language === "fr" ? "border-brand bg-brand/5" : "border-slate-200 bg-white"}`}>
                  <span className="text-4xl">🇫🇷</span>
                  <h3 className="mt-3 text-xl font-extrabold text-navy">Français</h3>
                  <p className="mt-1 text-xs text-slate-400">Supports de cours, quiz, devoirs et certificat en français</p>
                  {language === "fr" && <CheckCircle2 size={20} className="mt-3 text-brand" />}
                </button>
              </div>

              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3">
                <p className="text-xs text-amber-700">
                  {language === "fr"
                    ? "⚠ Ce choix ne pourra pas être modifié après l'inscription. Tous vos supports seront en français."
                    : "⚠ This selection cannot be changed after enrollment. All your materials will be in the selected language."}
                </p>
              </div>

              <button onClick={() => setStep("schedule")} disabled={!language}
                className="mt-6 flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-brand/90">
                {language === "fr" ? "Confirmer et continuer" : "Confirm & Continue"} <ArrowRight size={14} />
              </button>
            </motion.div>
          )}

          {/* ═══ STEP 4: Schedule Selection ═══ */}
          {step === "schedule" && selectedCourse && (
            <motion.div key="schedule" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep("language")} className="mb-4 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand"><ArrowLeft size={14} /> Back</button>
              <h2 className="text-2xl font-extrabold text-navy">Choose Your Schedule</h2>
              <p className="mt-1 text-sm text-slate-500">{selectedCourse.title}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button onClick={() => setSchedule("standard")}
                  className={`rounded-2xl border-2 p-6 text-left transition-all hover:shadow-md ${schedule === "standard" ? "border-brand bg-brand/5" : "border-slate-200 bg-white"}`}>
                  <h3 className="text-lg font-extrabold text-navy">Standard Schedule</h3>
                  <p className="mt-1 text-sm text-slate-400">Weekends Only — 4 months</p>
                  <p className="mt-3 text-2xl font-extrabold text-navy">{formatXAF(selectedCourse.standardPrice)}</p>
                  <div className="mt-3 space-y-1 text-xs text-slate-500">
                    <p>• 3 installment payments available</p>
                    <p>• 50% due before start, 25% at 60 days, 25% at 90 days</p>
                  </div>
                  {schedule === "standard" && <CheckCircle2 size={20} className="mt-3 text-brand" />}
                </button>

                {selectedCourse.hasBootcamp && (
                  <button onClick={() => setSchedule("bootcamp")}
                    className={`rounded-2xl border-2 p-6 text-left transition-all hover:shadow-md ${schedule === "bootcamp" ? "border-brand bg-brand/5" : "border-slate-200 bg-white"}`}>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold text-navy">Bootcamp</h3>
                      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">Fast-Paced</span>
                    </div>
                    <p className="mt-1 text-sm text-slate-400">Twice a week — accelerated</p>
                    <p className="mt-3 text-2xl font-extrabold text-navy">{formatXAF(selectedCourse.bootcampPrice)}</p>
                    <div className="mt-3 space-y-1 text-xs text-slate-500">
                      <p>• 2 installment payments available</p>
                      <p>• 60% due before start, 40% at 30 days</p>
                    </div>
                    {schedule === "bootcamp" && <CheckCircle2 size={20} className="mt-3 text-brand" />}
                  </button>
                )}

                {!selectedCourse.hasBootcamp && (
                  <div className="rounded-2xl border-2 border-slate-100 bg-slate-50 p-6 flex items-center justify-center">
                    <p className="text-sm text-slate-400 italic">Standard schedule only for this program</p>
                  </div>
                )}
              </div>

              <button onClick={() => setStep("payment")} disabled={!schedule}
                className="mt-6 flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-brand/90">
                Proceed to Payment <ArrowRight size={14} />
              </button>
            </motion.div>
          )}

          {/* ═══ STEP 5: Payment ═══ */}
          {step === "payment" && selectedCourse && (
            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <button onClick={() => setStep("schedule")} className="mb-4 flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-brand"><ArrowLeft size={14} /> Back</button>
              <h2 className="text-2xl font-extrabold text-navy">Payment</h2>

              {/* Summary */}
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-500 mb-3">Enrollment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">Student</span><span className="font-bold text-navy">{firstName} {lastName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Program</span><span className="font-bold text-navy">{selectedCourse.title}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Schedule</span><span className="font-bold text-navy">{schedule === "bootcamp" ? "Bootcamp" : "Standard (Weekends)"}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Language</span><span className="font-bold text-navy">{language === "fr" ? "Français" : "English"}</span></div>
                  <div className="border-t border-slate-100 pt-2 flex justify-between"><span className="font-bold text-slate-600">Total Amount</span><span className="text-xl font-extrabold text-navy">{formatXAF(totalAmount)}</span></div>
                </div>
              </div>

              {/* Payment Method */}
              <h3 className="mt-6 text-sm font-bold text-slate-500 mb-3">Select Payment Method</h3>
              <div className="space-y-3">
                <button onClick={() => setPaymentMethod("momo")}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${paymentMethod === "momo" ? "border-yellow-400 bg-yellow-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-400"><Smartphone size={22} className="text-black" /></div>
                  <div>
                    <p className="text-sm font-bold text-navy">MTN Mobile Money</p>
                    <p className="text-xs text-slate-400">Send to +237 6 51 32 18 78</p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-emerald-500">0% fee</span>
                </button>

                <button onClick={() => setPaymentMethod("orange")}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${paymentMethod === "orange" ? "border-orange-400 bg-orange-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500"><Smartphone size={22} className="text-white" /></div>
                  <div>
                    <p className="text-sm font-bold text-navy">Orange Money</p>
                    <p className="text-xs text-slate-400">Send to +237 6 59 06 19 89</p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-emerald-500">0% fee</span>
                </button>

                <button onClick={() => setPaymentMethod("card")}
                  className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${paymentMethod === "card" ? "border-indigo-400 bg-indigo-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600"><CreditCard size={22} className="text-white" /></div>
                  <div>
                    <p className="text-sm font-bold text-navy">Visa / Mastercard / International</p>
                    <p className="text-xs text-slate-400">Secure payment via Chariow</p>
                  </div>
                </button>
              </div>

              {/* Payment Instructions */}
              {(paymentMethod === "momo" || paymentMethod === "orange") && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <h4 className="text-sm font-bold text-navy mb-3">
                    {paymentMethod === "momo" ? "MTN MoMo Transfer Instructions" : "Orange Money Transfer Instructions"}
                  </h4>
                  <div className="rounded-xl bg-slate-100 p-4 mb-4">
                    <p className="text-xs text-slate-500">Send exactly</p>
                    <p className="text-2xl font-extrabold text-navy">{formatXAF(totalAmount)}</p>
                    <p className="text-xs text-slate-500 mt-1">to</p>
                    <p className="text-lg font-extrabold text-navy">{paymentMethod === "momo" ? "+237 6 51 32 18 78" : "+237 6 59 06 19 89"}</p>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-slate-600">Transaction ID (from your SMS confirmation)</label>
                    <input type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)} placeholder="e.g. TXN123456789"
                      className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none" />
                  </div>
                  <button onClick={handlePaymentSubmit} disabled={!transactionId.trim()}
                    className="mt-4 w-full rounded-xl bg-emerald-500 py-3.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-emerald-600">
                    Confirm Payment & Complete Enrollment
                  </button>
                </motion.div>
              )}

              {paymentMethod === "card" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-center">
                  <button onClick={handlePaymentSubmit}
                    className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white hover:bg-indigo-700">
                    Pay {formatXAF(totalAmount)} with Card →
                  </button>
                  <p className="mt-2 text-[10px] text-slate-400">You will be redirected to a secure payment page</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ═══ STEP 6: Credentials Issued ═══ */}
          {step === "credentials" && selectedCourse && (
            <motion.div key="credentials" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="text-center mb-8">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", damping: 15 }}
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </motion.div>
                <h2 className="mt-4 text-2xl font-extrabold text-navy">Enrollment Complete!</h2>
                <p className="mt-2 text-sm text-slate-500">Your student account has been created. Save your credentials below.</p>
              </div>

              {/* Credentials Card */}
              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lock size={18} className="text-emerald-600" />
                  <h3 className="text-lg font-extrabold text-emerald-800">Your Student Access Credentials</h3>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Student ID</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-lg font-extrabold text-navy">{studentId}</p>
                      <button onClick={() => handleCopy(studentId, "id")} className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-200">
                        <Copy size={12} /> {copied === "id" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-xs font-semibold text-slate-500 mb-1">Password</p>
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-lg font-extrabold text-navy">{showPassword ? studentPassword : "••••••••••••"}</p>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setShowPassword(!showPassword)} className="rounded-lg bg-slate-100 p-1.5 hover:bg-slate-200">
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button onClick={() => handleCopy(studentPassword, "pwd")} className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-slate-200">
                          <Copy size={12} /> {copied === "pwd" ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3">
                  <p className="text-xs text-amber-700 font-semibold">⚠ IMPORTANT: Save these credentials now!</p>
                  <p className="text-xs text-amber-600 mt-1">Use your Student ID and Password to log into the Client Portal to access your course materials. We've also sent these to your email at {email}.</p>
                </div>
              </div>

              {/* Enrollment Summary */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-sm font-bold text-slate-500 mb-3">Enrollment Details</h3>
                <div className="grid gap-2 text-xs sm:grid-cols-2">
                  <div className="flex justify-between rounded-lg bg-slate-50 p-2.5"><span className="text-slate-400">Program</span><span className="font-bold text-navy">{selectedCourse.title}</span></div>
                  <div className="flex justify-between rounded-lg bg-slate-50 p-2.5"><span className="text-slate-400">Schedule</span><span className="font-bold text-navy">{schedule === "bootcamp" ? "Bootcamp" : "Standard"}</span></div>
                  <div className="flex justify-between rounded-lg bg-slate-50 p-2.5"><span className="text-slate-400">Language</span><span className="font-bold text-navy">{language === "fr" ? "Français" : "English"}</span></div>
                  <div className="flex justify-between rounded-lg bg-slate-50 p-2.5"><span className="text-slate-400">Amount Paid</span><span className="font-bold text-navy">{formatXAF(totalAmount)}</span></div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/login" className="flex items-center gap-2 rounded-xl bg-brand px-8 py-3.5 text-sm font-semibold text-white hover:bg-brand/90">
                  <Lock size={14} /> Go to Student Portal
                </Link>
                <Link to="/institute" className="flex items-center gap-2 rounded-xl border-2 border-slate-200 px-6 py-3.5 text-sm font-semibold text-navy hover:bg-slate-50">
                  Browse More Courses
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
