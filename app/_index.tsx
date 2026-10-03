import Link from 'next/link';
import styles from './index.module.css';
import Masthead from './components/Masthead';
import SiteFooter from './components/SiteFooter';
import { ENTRIES } from './entries';

/* The landing is an index. Info and Shows open under the logo. Shows lists one line
   per occasion, exhibition or collection. The whole line is the link. */
export default function Index() {
  // Group by the year at the end of each date, keeping the order of ENTRIES (newest first)
  const years: { year: string; entries: typeof ENTRIES }[] = [];
  for (const e of ENTRIES) {
    const year = e.date.match(/\d{4}\s*$/)?.[0] ?? '';
    const group = years.find((y) => y.year === year);
    if (group) group.entries.push(e);
    else years.push({ year, entries: [e] });
  }

  return (
    <main className={styles.page}>
      <Masthead
        shows={
          <div className={styles.shows}>
        {years.map((y) => (
          <div key={y.year} className={styles.year}>
            {y.year && <h2 className={styles.yearLabel}>{y.year}</h2>}
            <ol className={styles.list}>
              {y.entries.map((e) => (
                <li key={e.number} className={styles.item}>
                  <Link href={e.href} className={styles.entry}>
                    <h3 className={styles.title}>{e.title}</h3>
                    <p className={styles.captionText}>{e.caption}</p>
                    <span className={styles.kind}>{e.kind}</span>
                    <span className={styles.date}>{e.date}</span>
                    <span className={styles.more}>{e.linkLabel ?? 'View more'}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
          </div>
        }
      />

      <SiteFooter />
    </main>
  );
}
