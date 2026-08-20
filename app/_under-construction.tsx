import Link from 'next/link';
import styles from './under-construction.module.css';
import SiteFooter from './components/SiteFooter';

export default function UnderConstruction() {
  return (
    <main className={styles.page}>
      <section className={styles.wrap}>
        <div className={styles.fadeWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/JOLI_Lockup_Black.png"
            alt="JOLI"
            className={styles.lockup}
          />
          <Link className={styles.entry} href="/occasions">
            Occasions
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
