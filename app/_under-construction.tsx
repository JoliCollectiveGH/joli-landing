import styles from './under-construction.module.css';

const SUPABASE_ASSETS =
  'https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets';

export default function UnderConstruction() {
  return (
    <main className={styles.wrap}>
      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${SUPABASE_ASSETS}/JOLI_Wordmark_Black.svg`}
          alt="JOLI Collective"
          className={styles.wordmark}
        />

        <h1 className={styles.headline}>Something new is on the way.</h1>
        <p className={styles.sub}>JOLI is being rebuilt.</p>

        <a className={styles.email} href="mailto:info@jolicollective.net">
          info@jolicollective.net
        </a>

        <p className={styles.footer}>© 2026 JOLI Collective</p>
      </div>
    </main>
  );
}
