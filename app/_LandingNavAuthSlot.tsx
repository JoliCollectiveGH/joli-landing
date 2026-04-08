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
      {auth.initial}
      <style>{`
        @keyframes joliAuthSlotFadeIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </a>
  );
}
