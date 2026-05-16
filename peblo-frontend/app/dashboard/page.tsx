"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText, CheckCircle, Activity, LayoutDashboard,
  PlusCircle, Sparkles, ChevronRight, Circle,
} from "lucide-react";
import { authHeaders, isLoggedIn } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function DashboardPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState({ totalNotes: 0, pendingTasksCount: 0, recentActivity: 0 });
  const [recentTasks, setRecentTasks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }

    fetch(`${API}/dashboard/insights`, { headers: authHeaders() })
      .then(res => {
        if (res.status === 401 || res.status === 403) { router.push("/login"); return null; }
        return res.json();
      })
      .then(data => {
        if (data) {
          setMetrics(data.metrics);
          setRecentTasks(data.recentTasks);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [router]);

  const stats = [
    { id: 1, title: "Total Notes Created", value: metrics.totalNotes, icon: <FileText size={20} className="text-blue-400" />, iconBg: "bg-blue-500/10", cardGlow: "hover:shadow-blue-900/10" },
    { id: 2, title: "AI-Generated Tasks", value: metrics.pendingTasksCount, icon: <CheckCircle size={20} className="text-purple-400" />, iconBg: "bg-purple-500/10", cardGlow: "hover:shadow-purple-900/10" },
    { id: 3, title: "Notes Active", value: metrics.recentActivity, badge: "Past 7 days", icon: <Activity size={20} className="text-emerald-400" />, iconBg: "bg-emerald-500/10", cardGlow: "hover:shadow-emerald-900/10" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" style={{ animationDelay: "2s" }} />

      <header className="sticky top-0 z-50 glass-panel border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-semibold tracking-tight">Peblo</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <Link href="/dashboard" className="text-white flex items-center gap-2"><LayoutDashboard className="w-4 h-4" /> Dashboard</Link>
            <Link href="/notes" className="hover:text-white transition-colors flex items-center gap-2"><FileText className="w-4 h-4" /> Notes</Link>
          </nav>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 border-2 border-zinc-700 hover:border-brand-500 transition-colors cursor-pointer overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <section className="mb-12 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">User</span>
          </h1>
          <p className="text-zinc-400 text-lg">Here&apos;s a look at your productivity and recent insights.</p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <div key={stat.id} className={`glass-panel rounded-2xl p-6 group cursor-default hover:-translate-y-1 hover:shadow-lg ${stat.cardGlow} transition-all duration-300`} style={{ animationDelay: `${0.1 * (i + 1)}s` }}>
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform duration-300`}>{stat.icon}</div>
                {stat.badge && <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold">{stat.badge}</span>}
              </div>
              <h2 className="text-4xl font-bold text-white mb-1">{stat.value}</h2>
              <p className="text-zinc-500 text-sm font-medium">{stat.title}</p>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Your Action Items</h2>
              <Link href="/notes" className="text-sm text-brand-400 hover:text-brand-300 transition-colors font-medium flex items-center group">
                View All <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            {recentTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-zinc-800 rounded-xl bg-zinc-900/30">
                <div className="w-16 h-16 mb-4 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500"><CheckCircle className="w-8 h-8" /></div>
                <h3 className="text-lg font-semibold text-white mb-2">You&apos;re all caught up!</h3>
                <p className="text-zinc-500 max-w-sm mb-6">Create new notes and let our AI extract actionable tasks for you automatically.</p>
                <Link href="/notes/new" className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-brand-500/20">
                  <PlusCircle className="w-4 h-4" /> Create Note
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentTasks.map((task, index) => (
                  <li key={index} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-transparent hover:border-zinc-700 transition-colors cursor-pointer group">
                    <Circle className="w-5 h-5 text-zinc-600 group-hover:text-brand-400 transition-colors flex-shrink-0" />
                    <span className="text-zinc-300 group-hover:text-white transition-colors leading-relaxed font-medium">{task}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between bg-gradient-to-br from-brand-600/10 to-transparent border-brand-500/20 hover:border-brand-500/40 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center mb-6 shadow-lg shadow-brand-500/25"><Sparkles className="w-6 h-6 text-white" /></div>
              <h3 className="text-lg font-bold text-white mb-2">AI Insights</h3>
              <p className="text-sm text-zinc-400 mb-6 leading-relaxed">Peblo automatically extracts insights and tasks from your unstructured notes.</p>
            </div>
            <Link href="/notes/new" className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white rounded-xl font-semibold flex items-center justify-center gap-2 border border-white/10 transition-colors">
              New Note <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
