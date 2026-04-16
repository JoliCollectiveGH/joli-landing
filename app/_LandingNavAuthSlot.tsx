'use client';

import { useEffect, useState } from 'react';

const APP_URL = 'https://app.jolicollective.net';
const WHOAMI_URL = `${APP_URL}/api/auth/whoami`;

type AuthState =
  | { status: 'loading' }
  | { status: 'signedOut' }
  | { status: 'signedIn'; initial: string };

type Props = {
  scrolled: boolean;
};

export default function LandingNavAuthSlot({ scrolled }: Props) {
  const [auth, setAuth] = useState<AuthState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    fetch(WHOAMI_URL, {
      credentials: 'include',
      cache: 'no-store',
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data && data.signedIn && typeof data.initial === 'string') {
          setAuth({ status: 'signedIn', initial: data.initial });
        } else {
          setAuth({ status: 'signedOut' });
        }
      })
      .catch(() => {
        if (cancelled) return;
        setAuth({ status: 'signedOut' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Render nothing while loading or if signed out — no flash, no clutter.
  if (auth.status !== 'signedIn') return null;

  // Signed in: terracotta avatar circle with the user's initial.
  // Links straight to the app. Visual style matches the in-app nav avatar.
  const ringColor = scrolled ? 'rgba(26, 24, 20, 0.12)' : 'rgba(247, 246, 242, 0.35)';

  return (
    <a
      href={APP_URL}
      aria-label="Open JOLI app"
      title="You are signed in — open JOLI"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: '#AD531B',
        color: '#F7F6F2',
        fontFamily: 'inherit',
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: 0,
        textDecoration: 'none',
        marginLeft: 4,
        boxShadow: `0 0 0 1px ${ringColor}`,
        transition: 'transform 160ms ease, box-shadow 160ms ease',
        flexShrink: 0,
        animation: 'joliAuthSlotFadeIn 220ms ease-out both',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.06)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
      <style>{`
        @keyframes joliAuthSlotFadeIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </a>
  );
}
