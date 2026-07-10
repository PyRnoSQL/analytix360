import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const revenue = [
  { month: "Jan", revenue: 4200000 },
  { month: "Feb", revenue: 3800000 },
  { month: "Mar", revenue: 5100000 },
  { month: "Apr", revenue: 4700000 },
  { month: "May", revenue: 6200000 },
  { month: "Jun", revenue: 5800000 },
];

const projectStatus = [
  { name: "Active", value: 12, color: "#2563EB" },
  { name: "Completed", value: 38, color: "#059669" },
  { name: "Pending", value: 5, color: "#D97706" },
];

const training = [
  { q: "Q1", enrolled: 120, certified: 98 },
  { q: "Q2", enrolled: 185, certified: 156 },
  { q: "Q3", enrolled: 210, certified: 189 },
  { q: "Q4", enrolled: 280, certified: 245 },
];

const statCards = [
  { label: "Revenue (YTD)", value: "29.8M FCFA", change: "+18%", color: "text-emerald" },
  { label: "Active Projects", value: "12", change: "+3", color: "text-brand" },
  { label: "Professionals Trained", value: "245", change: "+67", color: "text-amber" },
  { label: "Client Satisfaction", value: "98%", change: "+2%", color: "text-emerald" },
];

export function AdminDashboard() {
  return (
    <>
      <h2 className="mb-5 text-xl font-extrabold text-navy">
        Business Analytics
      </h2>

      {/* Stat cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {statCards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border border-slate-200 bg-white p-4"
          >
            <p className="text-[11px] font-semibold text-slate-500">
              {c.label}
            </p>
            <p className="mt-1 text-xl font-extrabold text-navy">{c.value}</p>
            <p className={`mt-1 text-xs font-semibold ${c.color}`}>
              <ArrowUpRight size={12} className="mr-0.5 inline" />
              {c.change}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="mb-6 grid gap-5 lg:grid-cols-3">
        {/* Revenue */}
        <div className="col-span-2 rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-navy">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenue}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748B" }}
                tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`}
              />
              <Tooltip formatter={(v) => `${Number(v).toLocaleString()} FCFA`} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                fill="url(#rg)"
                strokeWidth={2.5}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Project pie */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-bold text-navy">Project Status</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={projectStatus}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={4}
                dataKey="value"
              >
                {projectStatus.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4">
            {projectStatus.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-1.5 text-xs text-slate-500"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: p.color }}
                />
                {p.name} ({p.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Training chart */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="mb-4 text-sm font-bold text-navy">
          Training Performance
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={training}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="q" tick={{ fontSize: 12, fill: "#64748B" }} />
            <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
            <Tooltip />
            <Bar
              dataKey="enrolled"
              fill="#2563EB"
              radius={[4, 4, 0, 0]}
              name="Enrolled"
            />
            <Bar
              dataKey="certified"
              fill="#059669"
              radius={[4, 4, 0, 0]}
              name="Certified"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
