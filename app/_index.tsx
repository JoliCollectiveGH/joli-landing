import Link from 'next/link';
import styles from './index.module.css';
import SiteFooter from './components/SiteFooter';
import { ENTRIES } from './entries';

/* The landing is an index: one entry per occasion, exhibition or collection.
   Each shows its line and description, then links through to its page. */
export default function Index() {
  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/JOLI_Lockup_Black.png" alt="JOLI" className={styles.lockup} />
      </header>

      <section className={styles.stage}>
        <ol className={styles.list}>
          {ENTRIES.map((e) => (
            <li key={e.number} className={styles.entry}>
              <div className={styles.row}>
                <span className={styles.title}>{e.title}</span>
                <span className={styles.kind}>{e.kind}</span>
                <span className={styles.date}>{e.date}</span>
              </div>
              <p className={styles.captionText}>{e.caption}</p>
              <Link href={e.href} className={styles.more}>
                {e.linkLabel ?? 'View more'}
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />
    </main>
  );
}
