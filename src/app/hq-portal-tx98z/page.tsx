'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, RefreshCw } from 'lucide-react';

export default function HQPortalLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setAuthError('Please enter the security password.');
      return;
    }

    setIsLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: password.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setAuthError(data.error || 'Access denied. Incorrect authorization code.');
      } else {
        // Redirect to the submissions dashboard since cookie session is set
        router.push('/hq-portal-tx98z/submissions');
      }
    } catch (err: any) {
      setAuthError('Server connection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      data-admin-page="true" 
      className="min-h-screen bg-obsidian-950 flex flex-col justify-center items-center p-6 relative blueprint-grid-dark"
    >
      <div className="absolute inset-0 bg-radial from-gold-950/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="w-full max-w-md glass-panel-dark p-8 rounded-sm border border-white/5 relative z-10 shadow-2xl">
        <div className="flex flex-col items-center gap-4 text-center mb-8">
          <div className="p-4 rounded-full bg-gold-950/30 border border-gold-500/20 text-gold-500 shadow-lg shadow-gold-500/5">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="font-display font-bold tracking-widest text-lg uppercase text-white">
            StructuraNext <span className="text-gold-500 font-bold">HQ Admin</span>
          </h1>
          <p className="text-xs text-obsidian-400">
            Access restricted. Please input your secure terminal authentication password.
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-display font-semibold uppercase tracking-wider text-obsidian-400 mb-2">
              Authentication Code
            </label>
            <input
              type="password"
              placeholder="••••••••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full glass-input-dark px-4 py-3 rounded-sm text-center text-sm font-semibold tracking-widest text-gold-400 border border-white/10 placeholder-obsidian-700 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {authError && (
            <p className="text-xs text-red-400 text-center font-medium bg-red-950/30 border border-red-500/10 py-2 rounded-sm">
              {authError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-obsidian-950 font-display font-bold text-xs uppercase tracking-widest py-3.5 rounded-sm transition-all duration-150 cursor-pointer shadow-lg shadow-gold-500/10 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin text-obsidian-950" />
            ) : (
              'Authenticate Terminal'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
