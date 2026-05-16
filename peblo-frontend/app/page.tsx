import Link from "next/link";
import { Sparkles, FileText, CheckCircle, Activity, ChevronRight, ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

export const metadata = {
  title: "Peblo — AI-Powered Note Taking",
  description: "Turn your unstructured notes into actionable insights with Peblo's AI engine. Summarize, extract tasks, and stay productive.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans antialiased overflow-x-hidden">

      {/* Ambient orbs */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Peblo</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#preview" className="hover:text-white transition-colors">Dashboard</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/notes"
              className="bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-brand-500/20 transition-all hover:shadow-brand-500/40"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <span className="inline-flex items-center gap-2 py-1.5 px-3 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-6">
          <Sparkles className="w-3 h-3" />
          Now powered by NVIDIA NIM · Llama 3.1
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight mb-6">
          Your notes,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-purple-400 to-indigo-400">
            made intelligent
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Peblo turns your raw, unstructured notes into AI-powered summaries, action items, and productivity insights — automatically.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/notes"
            className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-7 py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-brand-500/30 transition-all hover:-translate-y-0.5 hover:shadow-brand-500/50"
          >
            Start Writing Free <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 px-7 py-3.5 rounded-xl font-semibold text-base transition-all hover:-translate-y-0.5"
          >
            View Dashboard <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* ── Dashboard Preview ── */}
      <section id="preview" className="max-w-6xl mx-auto px-6 pb-28">
        <div className="bg-zinc-900/80 backdrop-blur p-3 rounded-2xl border border-white/10 shadow-2xl shadow-brand-500/5">
          {/* Mock browser bar */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 px-2">
            <div className="flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-rose-500/50" />
              <div className="h-3 w-3 rounded-full bg-amber-500/50" />
              <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
            </div>
            <div className="text-xs text-zinc-500 font-mono bg-zinc-800 px-4 py-1 rounded-md border border-zinc-700">
              localhost:3000/dashboard
            </div>
            <div className="w-16" />
          </div>

          {/* Mocked dashboard UI */}
          <div className="p-4 space-y-4">
            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "Total Notes Created", value: "12", icon: <FileText size={16} className="text-blue-400" />, bg: "bg-blue-500/10", trend: "+3 this week" },
                { label: "AI-Generated Tasks", value: "24", icon: <CheckCircle size={16} className="text-purple-400" />, bg: "bg-purple-500/10", trend: "+8 from analysis" },
                { label: "Notes Active", value: "9", icon: <Activity size={16} className="text-emerald-400" />, bg: "bg-emerald-500/10", trend: "Past 7 days", badge: true },
              ].map((s, i) => (
                <div key={i} className="bg-zinc-800/60 border border-white/5 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${s.bg}`}>{s.icon}</div>
                    {s.badge && <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-medium">{s.trend}</span>}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{s.value}</div>
                  <div className="text-zinc-500 text-xs font-medium">{s.label}</div>
                  {!s.badge && <div className="text-xs text-brand-400 mt-1">{s.trend}</div>}
                </div>
              ))}
            </div>

            {/* Action items preview */}
            <div className="bg-zinc-800/60 border border-white/5 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-white">AI Action Items</span>
                <span className="text-xs text-brand-400">from your notes</span>
              </div>
              <div className="space-y-2">
                {["Schedule team standup for Monday morning", "Review Q3 performance metrics before Friday", "Follow up on client proposal — due this week"].map((t, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-700/50">
                    <div className="w-4 h-4 rounded-full border-2 border-zinc-600 flex-shrink-0" />
                    <span className="text-sm text-zinc-300">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to stay productive</h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">Peblo combines note-taking with AI to make sure nothing slips through the cracks.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Sparkles className="w-6 h-6 text-brand-400" />,
              bg: "bg-brand-500/10 border-brand-500/20",
              title: "AI Summarization",
              desc: "Instantly condense long notes into crisp, 1–2 sentence summaries using Llama 3.1.",
            },
            {
              icon: <CheckCircle className="w-6 h-6 text-purple-400" />,
              bg: "bg-purple-500/10 border-purple-500/20",
              title: "Task Extraction",
              desc: "Peblo automatically pulls out action items from your notes so you never miss a to-do.",
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-emerald-400" />,
              bg: "bg-emerald-500/10 border-emerald-500/20",
              title: "Productivity Dashboard",
              desc: "See your total notes, AI tasks, and weekly activity at a glance in one clean view.",
            },
            {
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              bg: "bg-amber-500/10 border-amber-500/20",
              title: "Lightning Fast",
              desc: "Built on Next.js and Express with SQLite for instant reads — no cloud lag.",
            },
            {
              icon: <Shield className="w-6 h-6 text-blue-400" />,
              bg: "bg-blue-500/10 border-blue-500/20",
              title: "Secure by Default",
              desc: "JWT authentication keeps your notes private. Your data stays yours.",
            },
            {
              icon: <FileText className="w-6 h-6 text-rose-400" />,
              bg: "bg-rose-500/10 border-rose-500/20",
              title: "Rich Note Editor",
              desc: "Clean, distraction-free writing experience with automatic save and AI analysis on demand.",
            },
          ].map((f, i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
              <div className={`w-12 h-12 rounded-xl ${f.bg} border flex items-center justify-center mb-5`}>{f.icon}</div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-6 pb-28 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Peblo works</h2>
        <p className="text-zinc-400 text-lg mb-16">Three steps to turn your notes into a productivity engine.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Write a note", desc: "Jot down anything — meeting notes, ideas, tasks, reflections. No formatting required." },
            { step: "02", title: "Click Analyze", desc: "Hit the AI button. Llama 3.1 reads your note and extracts a summary + action items instantly." },
            { step: "03", title: "Stay on top", desc: "Your dashboard updates automatically with new tasks and productivity metrics." },
          ].map((s, i) => (
            <div key={i} className="glass-panel rounded-2xl p-6 relative">
              <div className="text-5xl font-black text-white/5 absolute top-4 right-4">{s.step}</div>
              <div className="w-10 h-10 rounded-full bg-brand-600/20 border border-brand-500/30 flex items-center justify-center text-brand-400 font-bold text-sm mb-4">
                {s.step}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-3xl mx-auto px-6 pb-28 text-center">
        <div className="glass-panel rounded-3xl p-12 bg-gradient-to-br from-brand-600/10 to-indigo-600/5 border-brand-500/20">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/30">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to get smarter?</h2>
          <p className="text-zinc-400 mb-8 text-lg">Start taking notes and let Peblo do the heavy thinking for you.</p>
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-brand-500/30 transition-all hover:-translate-y-1 hover:shadow-brand-500/50"
          >
            Start for Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-zinc-400">Peblo</span>
          </div>
          <p>Built with Next.js · Express · NVIDIA NIM · SQLite</p>
          <div className="flex gap-6">
            <Link href="/dashboard" className="hover:text-zinc-300 transition-colors">Dashboard</Link>
            <Link href="/notes" className="hover:text-zinc-300 transition-colors">Notes</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
