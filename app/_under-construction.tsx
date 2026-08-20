import Link from 'next/link';
import styles from './under-construction.module.css';
import SiteFooter from './components/SiteFooter';

/* Info joins the row when it exists. A door without an href is not yet open. */
const DOORS = [
  {
    label: 'Showroom',
    note: '(coming soon)',
    src: '/Joli_Tote.jpg',
    alt: '',
    blurred: true,
  },
  {
    href: '/occasions',
    label: 'Occasions',
    src: '/occasion-001-01.jpg',
    alt: 'A guest before one of the photographs at Occasion 001',
  },
];

function Frame({ door }: { door: (typeof DOORS)[number] }) {
  return (
    <>
      <div className={`${styles.doorFrame} ${door.blurred ? styles.blurred : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.doorImg} src={door.src} alt={door.alt} />
      </div>
      <span className={styles.doorLabel}>
        {door.label}
        {door.note ? <span className={styles.doorNote}> {door.note}</span> : null}
      </span>
    </>
  );
}

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
          {DOORS.map((door) =>
            door.href ? (
              <Link key={door.label} className={styles.door} href={door.href}>
                <Frame door={door} />
              </Link>
            ) : (
              <div key={door.label} className={`${styles.door} ${styles.shut}`}>
                <Frame door={door} />
              </div>
            )
          )}
        </nav>
      </section>

      <SiteFooter />
    </main>
  );
}
