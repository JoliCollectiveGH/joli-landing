import Link from 'next/link';
import styles from './under-construction.module.css';
import SiteFooter from './components/SiteFooter';

/* One door for now. Showroom and Info join the row when they exist. */
const DOORS = [
  {
    href: '/occasions',
    label: 'Occasions',
    src: '/1014_Joli_SakiTasting.jpg',
    alt: 'Occasion 001. An intimate sake tasting at 1014 Gallery',
  },
];

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
      </header>

      <section className={styles.stage}>
        <nav className={styles.doors}>
          {DOORS.map((door) => (
            <Link key={door.href} className={styles.door} href={door.href}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={styles.doorImg} src={door.src} alt={door.alt} />
              <span className={styles.doorLabel}>{door.label}</span>
            </Link>
          ))}
        </nav>
      </section>

      <SiteFooter />
    </main>
  );
}
