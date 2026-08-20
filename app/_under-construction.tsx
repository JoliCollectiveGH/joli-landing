import Link from 'next/link';
import styles from './under-construction.module.css';
import SiteFooter from './components/SiteFooter';

export default function UnderConstruction() {
  return (
    <main className={styles.page}>
      <header className={styles.masthead}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/JOLI_Lockup_Black.png"
          alt="JOLI"
          className={styles.lockup}
        />
        <Link className={styles.entry} href="/occasions">
          Occasions
        </Link>
      </header>

      <section className={styles.stage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.object}
          src="/Joli_Vessel.jpg"
          alt="A hand-built ceramic vessel with three looped handles, on a plinth"
        />
      </section>

      <SiteFooter />
    </main>
  );
}
