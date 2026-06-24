'use client';

import { useState } from 'react';
import styles from './WaitlistForm.module.css';

type Status = 'idle' | 'loading' | 'done' | 'error';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <p className={styles.success}>
        You&rsquo;re on the list. More soon.
      </p>
    );
  }

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          required
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          aria-label="Email address"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          className={styles.button}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Signing up' : 'Sign up'}
        </button>
      </form>
      {status === 'error' && (
        <p className={styles.error}>Something went wrong. Try again.</p>
      )}
    </div>
  );
}
