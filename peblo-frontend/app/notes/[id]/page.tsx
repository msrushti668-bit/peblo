"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Sparkles, Loader2, CheckCircle } from "lucide-react";
import { authHeaders } from "@/lib/auth";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function NoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [note, setNote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/notes/${id}`, { headers: authHeaders() })
      .then(res => {
        if (res.status === 401 || res.status === 403) { router.push('/login'); return null; }
        return res.json();
      })
      .then(data => {
        if (data) setNote(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    setAiError(null);
    try {
      const res = await fetch(`${API}/notes/${id}/generate-summary`, {
        method: "POST",
        headers: authHeaders(),
      });
      const aiData = await res.json();

      if (!res.ok) {
        throw new Error(aiData.detail || aiData.error || `Server error ${res.status}`);
      }

      // Update local state with new insights
      setNote((prev: any) => ({
        ...prev,
        aiSummary: aiData.summary,
        aiActionItems: JSON.stringify(aiData.action_items || []),
        title: aiData.suggested_title || prev.title
      }));
    } catch (error: any) {
      console.error(error);
      setAiError(error.message || "Failed to generate insights. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (!note || note.error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl mb-4">Note not found</h1>
        <Link href="/notes" className="text-brand-400 hover:underline">Go back to Notes</Link>
      </div>
    );
  }

  const actionItems = note.aiActionItems ? JSON.parse(note.aiActionItems) : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 relative font-sans overflow-hidden">
      {/* Subtle ambient background */}
      {note.aiSummary && (
         <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      )}
      
      <div className="max-w-6xl mx-auto px-6 py-8 relative z-10 flex flex-col lg:flex-row gap-12">
        
        {/* Note Content Column */}
        <div className="flex-1">
          <div className="mb-8">
            <Link href="/notes" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-8">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Notes
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              {note.title}
            </h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
          </div>
        </div>

        {/* AI Insights Column */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          {!note.aiSummary && !isGenerating ? (
             <div className="glass-panel rounded-2xl p-8 text-center border border-brand-500/30 bg-gradient-to-br from-brand-600/10 to-transparent sticky top-8">
               <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
                 <Sparkles className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Generate Insights</h3>
               <p className="text-zinc-400 mb-6 text-sm">Let AI analyze this note to extract a summary and actionable tasks.</p>
               {aiError && (
                 <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-left">
                   ⚠️ {aiError}
                 </div>
               )}
               <button 
                 onClick={handleGenerateInsights}
                 className="w-full py-3 bg-white text-black hover:bg-zinc-200 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
               >
                 <Sparkles className="w-4 h-4" />
                 {aiError ? 'Retry Analysis' : 'Analyze Note'}
               </button>
             </div>
          ) : isGenerating ? (
             <div className="glass-panel rounded-2xl p-8 text-center sticky top-8 flex flex-col items-center justify-center min-h-[300px]">
               <Loader2 className="w-10 h-10 text-brand-500 animate-spin mb-4" />
               <h3 className="text-lg font-semibold text-white animate-pulse">Gemini is thinking...</h3>
               <p className="text-zinc-400 text-sm mt-2">Extracting insights and action items</p>
             </div>
          ) : (
             <div className="glass-panel rounded-2xl p-6 sticky top-8 border border-white/10 animate-fade-in-up">
               <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                 <Sparkles className="w-5 h-5 text-brand-400" />
                 <h2 className="text-lg font-bold text-white">AI Insights</h2>
               </div>
               
               <div className="mb-6">
                 <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Summary</h3>
                 <p className="text-zinc-300 text-sm leading-relaxed">{note.aiSummary}</p>
               </div>

               {actionItems.length > 0 && (
                 <div>
                   <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Action Items</h3>
                   <ul className="space-y-3">
                     {actionItems.map((item: string, idx: number) => (
                       <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                         <CheckCircle className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                         <span className="text-sm text-zinc-300">{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
               )}
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
