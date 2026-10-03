'use client';

import { useState } from 'react';
import styles from './Masthead.module.css';
import { SITE_DESCRIPTION } from '../site';

/* Logo left, Info right. Info opens a short line of facts under the logo
   and pushes the page down. */
export default function Masthead() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.masthead}>
      <div className={styles.bar}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/JOLI_Lockup_Black.png" alt="JOLI" className={styles.lockup} />
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="site-info"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'Close' : 'Info'}
        </button>
      </div>

      <div id="site-info" className={`${styles.drawer} ${open ? styles.open : ''}`}>
        <div className={styles.drawerInner}>
          <p className={styles.intro}>{SITE_DESCRIPTION}</p>
          <p className={styles.facts}>
            <span className={styles.muted}>London</span>
            <a className={styles.link} href="mailto:info@jolicollective.net" tabIndex={open ? 0 : -1}>
              info@jolicollective.net
            </a>
            <a
              className={styles.link}
              href="https://instagram.com/joli.collective"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={open ? 0 : -1}
            >
              Instagram
            </a>
          </p>
        </div>
      </div>
    </header>
  );
}
