"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Shield, Database, Cpu } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { motion } from "framer-motion";

/**
 * Panaversity H0 — Portfolio Hub — Unified Sign-In
 * High-Fidelity Blueprint / Wired aesthetic.
 */
export default function SignInPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await signIn.email({ email, password });
      if (res.error) throw new Error(res.error.message);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Initialization sequence failure");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#22d3ee]/20 flex flex-col font-sans">
      {/* Blueprint Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: "linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      
      {/* Cyan Scanning Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent via-[#22d3ee]/5 to-transparent h-[100vh] animate-[scan_8s_linear_infinite]" />

      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-[#1e293b] bg-black/80 backdrop-blur-md px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 border border-[#22d3ee] flex items-center justify-center font-mono text-[10px] text-[#22d3ee] group-hover:bg-[#22d3ee]/10 transition-all">P</div>
          <span className="font-mono text-xs tracking-[0.4em] uppercase font-bold text-[#64748b]">Portfolio Hub</span>
        </Link>
        <Link href="/sign-up" className="font-mono text-[9px] uppercase tracking-widest text-[#22d3ee] border border-[#22d3ee]/30 px-6 py-2 hover:bg-[#22d3ee]/10 transition-all">New Uplink</Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20 relative z-10">
        <div className="w-full max-w-md">
          {/* System Identity */}
          <div className="mb-12 space-y-4">
            <div className="inline-flex items-center gap-3 px-3 py-1 border border-[#22d3ee]/30 bg-[#22d3ee]/5 rounded-full">
              <Shield size={12} className="text-[#22d3ee]" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#22d3ee]">Scholar ID Authentication</span>
            </div>
            <h1 className="text-4xl font-mono tracking-tight text-white leading-none uppercase">
              Access <span className="text-[#22d3ee]">Archive</span>
            </h1>
            <p className="text-sm font-medium text-[#64748b] font-mono leading-relaxed max-w-sm">
              Use your Panaversity-wide credentials to uplink to this repository.
            </p>
          </div>

          {/* Blueprint Card */}
          <div className="border border-[#1e293b] bg-[#0f172a]/50 p-10 space-y-8 relative overflow-hidden backdrop-blur-xl">
             {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#22d3ee]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#22d3ee]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#22d3ee]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#22d3ee]" />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#64748b]">System.Identity.Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-[#1e293b] px-5 py-4 text-sm font-mono text-white focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/20 transition-all placeholder:text-[#1e293b]"
                  placeholder="EMAIL_ADDRESS_REQUIRED"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-[#64748b]">System.Identity.Key</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black border border-[#1e293b] px-5 py-4 text-sm font-mono text-white focus:outline-none focus:border-[#22d3ee] focus:ring-1 focus:ring-[#22d3ee]/20 transition-all placeholder:text-[#1e293b]"
                  placeholder="PASSCODE_ENCRYPTED"
                />
              </div>

              {error && (
                <div className="p-3 border border-red-500/30 bg-red-500/5 text-red-500 font-mono text-[10px] uppercase tracking-widest text-center">
                  [!] ERROR: ACCESS DENIED.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#22d3ee] hover:bg-[#22d3ee]/90 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-black transition-all disabled:opacity-50 flex items-center justify-center gap-3 relative overflow-hidden group active:scale-[0.98]"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    UPLINK_SEQUENCER <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-4 py-2">
               <div className="flex-1 h-[0.5px] bg-[#1e293b]" />
               <span className="font-mono text-[8px] text-[#64748b] tracking-[0.5em] uppercase px-2">Data Synchronized with H2</span>
               <div className="flex-1 h-[0.5px] bg-[#1e293b]" />
            </div>

            <p className="text-center font-mono text-[10px] tracking-wide text-[#64748b]">
              NEW_SCHOLAR?{" "}
              <Link href="/sign-up" className="text-[#22d3ee] border-b border-[#22d3ee]/30 hover:bg-[#22d3ee]/10 transition-all px-1 underline underline-offset-4">INITIALIZE_SEQUENCE</Link>
            </p>
          </div>

          <div className="mt-12 flex justify-between items-center opacity-40">
            <div className="flex gap-4">
              <Database size={12} className="text-[#64748b]" />
              <Cpu size={12} className="text-[#64748b]" />
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.5em] text-[#64748b]">Panaversity_Wired_Core</div>
          </div>
        </div>
      </main>
    </div>
  );
}
