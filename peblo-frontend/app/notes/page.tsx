"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, FileText, PlusCircle, Sparkles, Loader2 } from "lucide-react";
import { authHeaders, isLoggedIn } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function NotesPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) { router.push("/login"); return; }

    fetch(`${API}/notes`, { headers: authHeaders() })
      .then(res => {
        if (res.status === 401 || res.status === 403) { router.push("/login"); return null; }
        return res.json();
      })
      .then(data => {
        if (data) setNotes(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 relative overflow-hidden font-sans">
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/dashboard" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-4">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Your Notes</h1>
            <p className="text-zinc-400">Manage and create notes. Our AI will automatically extract tasks.</p>
          </div>
          <Link href="/notes/new" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-brand-500/20">
            <PlusCircle className="w-4 h-4" />
            New Note
          </Link>
        </div>

        {notes.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-zinc-700">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500">
              <FileText className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No notes yet</h2>
            <p className="text-zinc-400 max-w-sm mx-auto mb-6">You haven&apos;t created any notes yet. Click below to start capturing your thoughts.</p>
            <Link href="/notes/new" className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-brand-500/20">
              <PlusCircle className="w-4 h-4" />
              Create Your First Note
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note: any) => (
              <Link href={`/notes/${note.id}`} key={note.id} className="glass-panel rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 group block border border-transparent hover:border-zinc-700">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white group-hover:text-brand-400 transition-colors line-clamp-1">{note.title}</h3>
                  {note.aiSummary && <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0" />}
                </div>
                <p className="text-zinc-400 text-sm line-clamp-3 mb-4 leading-relaxed">{note.content}</p>
                <div className="text-xs text-zinc-500 font-medium">{new Date(note.updatedAt).toLocaleDateString()}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
