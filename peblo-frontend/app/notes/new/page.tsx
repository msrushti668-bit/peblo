"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Save, Loader2 } from "lucide-react";
import { authHeaders } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function NewNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch(`${API}/notes`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ title: title || "Untitled Note", content }),
      });

      if (res.status === 401 || res.status === 403) {
        router.push("/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to create note");

      const newNote = await res.json();
      router.push(`/notes/${newNote.id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 relative font-sans">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/notes" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Notes
          </Link>
          <button
            onClick={handleSave}
            disabled={isSaving || !content.trim()}
            className="flex items-center gap-2 px-5 py-2 bg-white text-black hover:bg-zinc-200 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Note
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        <div className="space-y-6 animate-fade-in-up">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-4xl md:text-5xl font-bold text-white placeholder-zinc-700 outline-none border-none focus:ring-0"
          />
          <textarea
            placeholder="Start writing your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-[60vh] bg-transparent text-lg text-zinc-300 placeholder-zinc-700 outline-none border-none focus:ring-0 resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
