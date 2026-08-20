import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './occasions.module.css';
import SiteFooter from '../components/SiteFooter';
import RevealObserver from '../components/RevealObserver';

export const metadata: Metadata = {
  title: 'Occasions | JOLI',
  description: 'Occasion 001. MaiSake at 1014 Gallery.',
  openGraph: {
    title: 'Occasions | JOLI',
    description: 'Occasion 001. MaiSake at 1014 Gallery.',
    url: 'https://jolicollective.net/occasions',
    siteName: 'JOLI',
    type: 'website',
    images: [
      {
        url: 'https://jolicollective.net/1014_Joli_SakiTasting.jpg',
        width: 1400,
        height: 1750,
      },
    ],
  },
  alternates: {
    canonical: 'https://jolicollective.net/occasions',
  },
};

export default function Occasions() {
  return (
    <main className={styles.page}>
      <RevealObserver />
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <header className={styles.pageHeader}>
        <Link href="/" aria-label="JOLI, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/JOLI_Lockup_Black.png"
            alt="JOLI"
            className={styles.headerLockup}
          />
        </Link>
      </header>

      <section className={styles.occasion}>
        <div className={styles.occasionInner}>
          <figure className={`${styles.occasionFigure} ${styles.reveal}`} data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.occasionImg}
              src="/1014_Joli_SakiTasting.jpg"
              alt="An intimate evening of Saki Tasting presented by Erika Haigh & Mai. Invitation only. JOLI — 10 14."
            />
          </figure>
          <div className={`${styles.occasionText} ${styles.reveal}`} data-reveal>
            <span className={styles.occasionLabel}>Occasion 001</span>
            <span className={styles.occasionTitle}>MaiSake at 1014 Gallery</span>
            <span className={styles.occasionCredit}>An intimate sake tasting surrounded by Still Formation, Jess Gough&apos;s solo show</span>
            <span className={styles.occasionMeta}>9 July 2026</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
