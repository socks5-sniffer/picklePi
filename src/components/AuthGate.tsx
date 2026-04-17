import React, { useEffect, useState } from 'react';
import { onAuthChanged, signInWithGoogle, signOutUser, handleRedirectResult, type User } from '../lib/firebase';

// ── DEV BYPASS ──────────────────────────────────────────────────────────────
// Only allow the auth bypass in development builds.
const DEV_BYPASS_AUTH = import.meta.env.DEV;
const DEV_MOCK_USER = { uid: 'dev-user', email: 'dev@local.test', displayName: 'Dev User' } as User;
// ────────────────────────────────────────────────────────────────────────────

interface Props {
  children: (user: User, onSignOut: () => void) => React.ReactNode;
}

export default function AuthGate({ children }: Props) {
  if (DEV_BYPASS_AUTH) {
    return <>{children(DEV_MOCK_USER, () => {})}</>;
  }
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let cancelled = false;
    const timeout = setTimeout(() => { if (!cancelled) setLoading(false); }, 10000);

    // Wait for getRedirectResult to finish before subscribing to auth state.
    // Without this, onAuthStateChanged fires null immediately (before Firebase
    // processes the returning redirect), which drops the user to the sign-in screen.
    handleRedirectResult()
      .then((redirectUser) => {
        if (cancelled) return;
        if (redirectUser) {
          setUser(redirectUser);
          setLoading(false);
        }
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Sign-in failed after redirect');
        setLoading(false);
      })
      .finally(() => {
        if (cancelled) return;
        // Now it's safe to listen — Firebase has finished processing the redirect
        unsubscribe = onAuthChanged((u) => {
          clearTimeout(timeout);
          setUser(u);
          setLoading(false);
        });
      });

    return () => {
      cancelled = true;
      unsubscribe?.();
      clearTimeout(timeout);
    };
  }, []);

  const handleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle(); // Redirects away — page will reload on return
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Sign-in failed');
    }
  };

  const handleSignOut = async () => {
    await signOutUser();
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--picklePi-bg-app)]">
        <div className="text-slate-400 text-sm animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--picklePi-bg-app)]">
        <div className="flex flex-col items-center gap-6 p-10 rounded-2xl border border-slate-700 bg-slate-800/60 shadow-xl max-w-sm w-full mx-4">
          <img src="/images/pickle-pi-logo.png" alt="picklePi" className="w-20 h-20 object-contain rounded-xl" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-1">picklePi</h1>
            <p className="text-slate-400 text-sm">Sign in to save your progress across devices</p>
          </div>
          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors shadow"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return <>{children(user, handleSignOut)}</>;
}
