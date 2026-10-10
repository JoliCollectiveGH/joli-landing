'use client';

import { useState, type ReactNode } from 'react';
import styles from './Masthead.module.css';
import { SITE_INFO, SITE_LEAD } from '../site';
import Spiral from './Spiral';

/* Logo left, two words right. Info and Shows each open a drawer under the logo.
   One is always open, and opening one closes the other. Shows is open on load
   so the work is never hidden. */
export default function Masthead({ shows }: { shows: ReactNode }) {
  const [view, setView] = useState<'info' | 'shows'>('shows');
  const infoOpen = view === 'info';
  const showsOpen = view === 'shows';

  return (
    <header className={styles.masthead}>
      <div className={styles.bar}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/JOLI_Lockup_Black.png" alt="JOLI" className={styles.lockup} />
        <nav className={styles.nav}>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={infoOpen}
            aria-controls="site-info"
            onClick={() => setView('info')}
          >
            Info
          </button>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={showsOpen}
            aria-controls="site-shows"
            onClick={() => setView('shows')}
          >
            Occasions
          </button>
        </nav>
      </div>

      <div id="site-info" className={`${styles.drawer} ${infoOpen ? styles.open : ''}`} inert={!infoOpen}>
        <div className={styles.drawerInner}>
          <div className={styles.info}>
            <div className={styles.spiralWrap}>
              <Spiral className={styles.spiral} />
            </div>
            <div className={styles.words}>
              <p className={styles.lead}>{SITE_LEAD}</p>
              {SITE_INFO.map((para) => (
                <p key={para} className={styles.intro}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="site-shows" className={`${styles.drawer} ${showsOpen ? styles.open : ''}`} inert={!showsOpen}>
        <div className={styles.drawerInner}>{shows}</div>
      </div>
    </header>
  );
}
