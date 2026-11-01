import styles from './Hero.module.css';

/* The first thing a visitor sees. A full-bleed bitmap with the lockup on it.
   The masthead below holds Info and Occasions, and the page scrolls in as it was.
   The images are made by scripts/make-hero.py from the licensed master, which is
   kept outside this repo in Branding/licensed-images/haus-rucker-co. */
export default function Hero() {
  return (
    <section className={styles.hero} aria-label="JOLI">
      <picture>
        <source media="(max-width: 760px)" srcSet="/landing-hero-mobile.jpg" />
        <img
          className={styles.image}
          src="/landing-hero.jpg"
          alt="Visitors lying, climbing and crowding on a white inflated cushion beneath a giant transparent sphere, seen from above"
          fetchPriority="high"
        />
      </picture>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/JOLI_Lockup_Black.png" alt="JOLI" className={styles.lockup} />
    </section>
  );
}
