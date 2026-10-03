import Link from 'next/link';
import styles from './index.module.css';
import SiteFooter from './components/SiteFooter';
import { ENTRIES } from './entries';

/* The landing is an index: one line per occasion, exhibition or collection.
   Each line opens to one image and a caption, then through to its page. */
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
            <li key={e.number} className={styles.item}>
              <details className={styles.entry} name="index">
                <summary className={styles.row}>
                  <span className={styles.num}>{e.number}</span>
                  <span className={styles.title}>{e.title}</span>
                  <span className={styles.kind}>{e.kind}</span>
                  <span className={styles.date}>{e.date}</span>
                  <span className={styles.toggle} aria-hidden="true" />
                </summary>

                <div className={styles.panel}>
                  <Link href={e.href} className={styles.figureLink}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className={styles.img} src={e.image} alt={e.alt} loading="lazy" />
                  </Link>
                  <div className={styles.caption}>
                    <p className={styles.captionText}>{e.caption}</p>
                    <Link href={e.href} className={styles.more}>
                      {e.linkLabel ?? 'View'}
                    </Link>
                  </div>
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter />
    </main>
  );
}
