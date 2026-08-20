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
        url: 'https://jolicollective.net/occasion-001-02.jpg',
        width: 1800,
        height: 1200,
      },
    ],
  },
  alternates: {
    canonical: 'https://jolicollective.net/occasions',
  },
};

/* wide images take both columns, the rest sit two up */
const FRAMES = [
  { src: '/occasion-001-02.jpg', alt: 'The room during the tasting', wide: true },
  { src: '/occasion-001-03.jpg', alt: 'Sake poured at the counter' },
  { src: '/occasion-001-04.jpg', alt: 'A bottle passed between hands' },
  { src: '/occasion-001-05.jpg', alt: 'A bottle held beside a row of empty glasses' },
  { src: '/occasion-001-06.jpg', alt: 'Bottles and hydrangea on the counter' },
  { src: '/occasion-001-07.jpg', alt: 'Guests with sake glasses', wide: true },
  { src: '/occasion-001-08.jpg', alt: 'Two guests in conversation beside the work' },
  { src: '/occasion-001-09.jpg', alt: 'A guest with a glass, bottles behind' },
  { src: '/occasion-001-10.jpg', alt: 'Glasses on a dark table, seen from above' },
  { src: '/occasion-001-11.jpg', alt: 'Three guests in front of a photograph' },
];

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
              src="/occasion-001-01.jpg"
              alt="A guest standing before one of the photographs"
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

      <section className={styles.gallery}>
        <div className={styles.galleryInner}>
          {FRAMES.map((frame) => (
            <figure
              key={frame.src}
              className={`${styles.frame} ${frame.wide ? styles.wide : ''} ${styles.reveal}`}
              data-reveal
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className={styles.frameImg}
                src={frame.src}
                alt={frame.alt}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
