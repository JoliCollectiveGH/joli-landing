import styles from './PhoneMockup.module.css';

export default function PhoneMockup() {
  return (
    <div className={styles.phone}>
      <div className={styles.bezel}>
        <div className={styles.screen}>
          <header className={styles.appHeader}>
            <span className={styles.appLogo}>JOLI</span>
            <span className={styles.appTitle}>New trip</span>
            <span className={styles.appIcon}>···</span>
          </header>

          <div className={styles.chat}>
            <div className={styles.userMessage}>
              Thinking about a long weekend somewhere in October. Maybe Italy? Somewhere we haven&apos;t been.
            </div>

            <div className={styles.joliMessage}>
              Good time of year for Italy. A couple of things to know first — would you rather a city base or somewhere slower, with small towns and drives in between? And how many nights — three, four?
            </div>

            <div className={styles.statusLine}>Sketching out the brief</div>

            <div className={styles.userMessage}>
              Slower. Four nights.
            </div>
          </div>

          <footer className={styles.inputBar}>
            <div className={styles.inputField}>Reply to JOLI…</div>
            <div className={styles.sendButton}>↑</div>
          </footer>
        </div>
      </div>
    </div>
  );
}
