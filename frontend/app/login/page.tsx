'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      login(res.data.token, res.data.user);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPersona = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Top Brand Bar */}
      <header className="px-6 py-6 border-b border-slate-900 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-600/30">
            W
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Ware<span className="text-blue-500">IQ</span>
          </span>
        </Link>
        <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-white">
          ← Back to Website
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Sign In to WareIQ Portal
            </h1>
            <p className="text-xs text-slate-400">
              Access your real-time fulfillment operations, inventory, and order analytics.
            </p>
          </div>

          {/* Persona 1-Click Fill Helper */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Demo Persona Quick Sign-In (1-Click Fill)
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickPersona('admin@wareiq-demo.com', 'Password@123')}
                className="bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 p-2 rounded-xl text-left transition-all cursor-pointer"
              >
                <div className="text-[10px] text-amber-400 font-bold uppercase">👑 Admin</div>
                <div className="text-[11px] font-semibold truncate text-white">Master HQ</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPersona('ops@wareiq-demo.com', 'Password@123')}
                className="bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 p-2 rounded-xl text-left transition-all cursor-pointer"
              >
                <div className="text-[10px] text-blue-400 font-bold uppercase">⚡ Ops</div>
                <div className="text-[11px] font-semibold truncate text-white">Dispatch</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickPersona('demo@brandmerchant.com', 'Password@123')}
                className="bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200 p-2 rounded-xl text-left transition-all cursor-pointer"
              >
                <div className="text-[10px] text-emerald-400 font-bold uppercase">🛍️ Merchant</div>
                <div className="text-[11px] font-semibold truncate text-white">Acme D2C</div>
              </button>
            </div>
          </div>

          {/* Form */}
          <Card className="bg-slate-900 border-slate-800 text-slate-100 p-6 sm:p-8 shadow-xl">
            {error && (
              <div className="mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Business Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <Button
                type="submit"
                isLoading={loading}
                className="w-full py-2.5 shadow-md shadow-blue-600/30 font-bold"
              >
                Sign In to Dashboard <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </form>
          </Card>

          <div className="text-center text-[11px] text-slate-500">
            Demonstration Environment • Role-based access control enabled
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-600 border-t border-slate-900">
        WareIQ Fulfillment Platform Demo • Manoj Arja
      </footer>
    </div>
  );
}
