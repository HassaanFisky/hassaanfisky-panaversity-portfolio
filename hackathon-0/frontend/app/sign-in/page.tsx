"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Lock } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { motion } from "framer-motion";

/**
 * Panaversity H0 — Portfolio Hub — Sign In Page
 * Clean, human-readable design. No jargon terminology.
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
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg-base flex flex-col font-sans relative overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,var(--accent-dim),transparent_60%)]" />
      
      {/* Dot grid */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-border-fine bg-bg-base/80 backdrop-blur-md px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 border border-accent flex items-center justify-center font-serif text-[13px] text-accent group-hover:bg-accent/10 transition-all rounded-lg">
            H
          </div>
          <span className="font-serif text-sm tracking-[0.2em] uppercase font-bold text-text-primary">Portfolio Hub</span>
        </Link>
        <Link
          href="/sign-up"
          className="text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/30 px-6 py-2 rounded-full hover:bg-accent/10 transition-all"
        >
          Create Account
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-6 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md"
        >
          {/* Heading */}
          <div className="mb-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-accent/30 bg-accent/5 rounded-full">
              <Lock size={12} className="text-accent" />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent">Secure Sign In</span>
            </div>
            <h1 className="text-4xl font-serif tracking-tight text-text-primary leading-none">
              Welcome back
            </h1>
            <p className="text-sm font-medium text-text-muted leading-relaxed max-w-sm">
              Sign in to your account to access your dashboard and manage everything.
            </p>
          </div>

          {/* Form Card */}
          <div className="glass-apple rounded-3xl p-10 space-y-8 border border-border-fine shadow-float">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-fine px-5 py-4 text-sm font-sans text-text-primary rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/40"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.3em] text-text-muted">
                  Password
                </label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-bg-elevated border border-border-fine px-5 py-4 text-sm font-sans text-text-primary rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-text-muted/40"
                  placeholder="Your password"
                />
              </div>

              {error && (
                <div className="p-3 border border-red-500/30 bg-red-500/5 text-red-500 text-[11px] rounded-xl text-center font-medium">
                  {error}
                </div>
              )}

              {/* CHANGED: "UPLINK_SEQUENCER" → "Sign In" */}
              <button
                id="sign-in-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:brightness-110 py-4 font-bold text-[12px] uppercase tracking-[0.3em] text-white transition-all disabled:opacity-50 flex items-center justify-center gap-3 rounded-2xl relative overflow-hidden group active:scale-[0.98] shadow-lg shadow-accent/20"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Sign In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-[0.5px] bg-border-fine" />
              <span className="text-[8px] text-text-muted tracking-[0.3em] uppercase px-2">or</span>
              <div className="flex-1 h-[0.5px] bg-border-fine" />
            </div>

            {/* CHANGED: "NEW_SCHOLAR? INITIALIZE_SEQUENCE" → "Don't have an account? Create one" */}
            <p className="text-center text-[11px] tracking-wide text-text-muted">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-accent border-b border-accent/30 hover:border-accent transition-all px-0.5 font-bold">
                Create one
              </Link>
            </p>
          </div>

          <p className="text-center mt-8 text-[9px] uppercase tracking-[0.4em] text-text-muted/60">
            Panaversity &bull; Hassaan AI Architect
          </p>
        </motion.div>
      </main>
    </div>
  );
}
