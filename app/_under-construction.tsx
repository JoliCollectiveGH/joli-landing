'use client';

import { useState } from 'react';
import styles from './under-construction.module.css';

const SUPABASE_ASSETS =
  'https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function UnderConstruction() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim();

    if (!EMAIL_RE.test(value)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: value }),
      });

      if (!res.ok) throw new Error('request failed');

      setStatus('success');
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  }

  return (
    <main className={styles.wrap}>
      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${SUPABASE_ASSETS}/JOLI_Wordmark_Black.svg`}
          alt="JOLI Collective"
          className={styles.wordmark}
        />

        {status === 'success' ? (
          <>
            <h1 className={styles.headline}>You&rsquo;re on the list.</h1>
            <p className={styles.success}>
              We&rsquo;ll be in touch when there&rsquo;s something to show you.
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.headline}>Something new is on the way.</h1>
            <p className={styles.sub}>
              JOLI is being rebuilt. Leave your email and we&rsquo;ll let you
              know when it&rsquo;s ready.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                className={styles.input}
                placeholder="your@email.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                aria-label="Email address"
                autoComplete="email"
                disabled={status === 'submitting'}
              />
              <button
                type="submit"
                className={styles.submit}
                disabled={status === 'submitting'}
                aria-label="Join the list"
              >
                →
              </button>
            </form>

            <p
              className={`${styles.note} ${
                status === 'error' ? styles.noteError : ''
              }`}
              role={status === 'error' ? 'alert' : undefined}
            >
              {message}
            </p>
          </>
        )}

        <p className={styles.footer}>
          <a href="mailto:info@jolicollective.net">info@jolicollective.net</a>
          <span className={styles.footerDot}>·</span>
          <span>© 2026 JOLI Collective</span>
        </p>
      </div>
    </main>
  );
}
