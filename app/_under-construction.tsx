import styles from './under-construction.module.css';
import WaitlistForm from './components/WaitlistForm';
import BackgroundVideo from './components/BackgroundVideo';

export default function UnderConstruction() {
  return (
    <main className={styles.wrap}>
      <BackgroundVideo
        className={styles.bg}
        poster="/Joli_Texture_06_poster.jpg"
        src="/Joli_Texture_06.mp4"
      />
      <div className={styles.scrim} />

      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/JOLI_Lockup_White.png"
          alt="JOLI"
          className={styles.lockup}
        />
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.waitlistBlock}>
          <p className={styles.invite}>
            A social club curating intimate hospitality at the intersection of art, food, and drink.
          </p>
          <p className={styles.prompt}>Join the waiting list</p>
          <WaitlistForm />
        </div>

        <div className={styles.rightGroup}>
          <div className={styles.contact}>
            <a className={styles.link} href="mailto:info@jolicollective.net">
              info@jolicollective.net
            </a>
            <a
              className={styles.link}
              href="https://instagram.com/joli.collective"
              target="_blank"
              rel="noopener noreferrer"
            >
              @joli.collective
            </a>
          </div>
          <p className={styles.footer}>© 2026 JOLI</p>
        </div>
      </div>
    </main>
  );
}
