import styles from './under-construction.module.css';
import WaitlistForm from './components/WaitlistForm';

export default function UnderConstruction() {
  return (
    <main className={styles.wrap}>
      <video
        className={styles.bg}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/Joli_Texture_06_poster.jpg"
      >
        <source src="/Joli_Texture_06.mp4" type="video/mp4" />
      </video>
      <div className={styles.scrim} />

      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/JOLI_Lockup_White.png"
          alt="JOLI"
          className={styles.lockup}
        />

        <p className={styles.invite}>
          Join the waiting list for access to JOLI Collective social club
        </p>

        <WaitlistForm />
      </div>

      <a className={styles.email} href="mailto:info@jolicollective.net">
        info@jolicollective.net
      </a>

      <p className={styles.footer}>© 2026 JOLI</p>
    </main>
  );
}
