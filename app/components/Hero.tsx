import styles from './Hero.module.css';
import { SITE_LEAD } from '../site';

/* The first thing a visitor sees. A full-bleed bitmap, the lockup, one line low on
   the left and the credit low on the right. The page below scrolls in as it was.
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
      <img src="/JOLI_Lockup_Black.png" alt="" className={styles.lockup} />

      <div className={styles.foot}>
        <p className={styles.line}>
          <span className={styles.plate}>{SITE_LEAD}</span>
        </p>
        <p className={styles.credit}>
          <span className={styles.plate}>
            Haus-Rucker-Co, Giant Billiard, Vienna, 1970. Courtesy Archive Zamp Kelp
          </span>
        </p>
      </div>
    </section>
  );
}
