"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { signIn } from "@/lib/auth-client";

/**
 * Panaversity H3 — LearnFlow — Unified Sign-In
 * High-Fidelity Scholar / Academic aesthetic.
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
      router.push("/learn");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2D2926] flex flex-col font-sans selection:bg-[#D97757]/10">
      {/* Background Ornamentation */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#D97757]/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-emerald-500/5 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-[#E5E0D8] bg-white/80 backdrop-blur-md px-12 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <GraduationCap className="text-[#D97757]" size={24} />
          <span className="font-serif font-bold text-lg tracking-tight uppercase">LearnFlow</span>
        </Link>
        <Link href="/sign-up" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A857D] hover:text-[#2D2926] transition-colors bg-[#FAF9F6] px-6 py-2.5 rounded-full border border-[#E5E0D8]">Sign Up</Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20 relative z-10">
        <div className="w-full max-w-md">
          {/* Editorial Eyebrow */}
          <div className="mb-12 space-y-4 text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D97757]">Welcome Back</div>
            <h1 className="text-5xl font-serif tracking-tight text-[#2D2926] leading-tight">
              Sign in to <span className="italic font-normal">LearnFlow.</span>
            </h1>
            <p className="text-sm font-medium text-[#8A857D] leading-relaxed max-w-xs mx-auto">
              Enter your email and password to continue.
            </p>
          </div>

          {/* Academic Card */}
          <div className="bg-white rounded-[32px] border border-[#E5E0D8] shadow-[0_32px_64px_-16px_rgba(45,41,38,0.1)] p-12 space-y-8 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A857D]">Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-[#D97757] focus:ring-4 focus:ring-[#D97757]/5 transition-all placeholder:text-[#BBB6AE]"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#8A857D]">Password</label>
                  <Link href="#" className="text-[9px] font-bold uppercase tracking-widest text-[#D97757]/50 hover:text-[#D97757]">Request Key</Link>
                </div>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-[#D97757] focus:ring-4 focus:ring-[#D97757]/5 transition-all placeholder:text-[#BBB6AE]"
                  placeholder="••••••••••••"
                />
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs font-bold text-center border border-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D97757] to-[#c86444] py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-xl shadow-[#D97757]/20 hover:shadow-2xl hover:shadow-[#D97757]/30 transition-all disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight size={15} />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-4 py-2">
               <div className="flex-1 h-[0.5px] bg-[#E5E0D8]" />
               <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#BBB6AE]">or</span>
               <div className="flex-1 h-[0.5px] bg-[#E5E0D8]" />
            </div>

            <p className="text-center text-[12px] font-medium text-[#8A857D]">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-[#D97757] font-bold hover:underline underline-offset-4 decoration-2">Sign Up</Link>
            </p>
          </div>

          <div className="mt-12 flex flex-col items-center gap-4 opacity-40">
            <div className="h-px w-24 bg-[#E5E0D8]" />
            <div className="text-[9px] font-bold uppercase tracking-[0.5em] text-[#8A857D]">Panaversity LearnFlow</div>
          </div>
        </div>
      </main>
    </div>
  );
}
