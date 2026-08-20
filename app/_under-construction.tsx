import Link from 'next/link';
import styles from './under-construction.module.css';
import SiteFooter from './components/SiteFooter';

/* One door for now. Showroom and Info join the row when they exist. */
const DOORS = [
  {
    href: '/occasions',
    label: 'Occasions',
    src: '/occasion-001-sake.jpg',
    alt: 'Guests with sake glasses at Occasion 001',
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
