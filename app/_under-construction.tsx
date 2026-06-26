import styles from './under-construction.module.css';
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
        <div className={styles.fadeWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/JOLI_Lockup_White.png"
            alt="JOLI"
            className={styles.lockup}
          />
          <p className={styles.inviteMobile}>
            Joli curates intimate hospitality<br />
            The kind of occasions that stay with you
          </p>
          <div className={styles.mobileIcons}>
            <a className={styles.iconLink} href="mailto:info@jolicollective.net" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
            </a>
            <a className={styles.iconLink} href="https://instagram.com/joli.collective" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.infoBlock}>
          <p className={styles.invite}>
            Joli curates intimate hospitality<br />
            The kind of occasions that stay with you
          </p>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.rightGroup}>
            <div className={styles.contact}>
              <a className={styles.link} href="mailto:info@jolicollective.net" aria-label="Email">
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <polyline points="2,4 12,13 22,4"/>
                </svg>
                <span className={styles.linkText}>info@jolicollective.net</span>
              </a>
              <a
                className={styles.link}
                href="https://instagram.com/joli.collective"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                <span className={styles.linkText}>@joli.collective</span>
              </a>
            </div>
            <p className={styles.footer}>© 2026 JOLI</p>
          </div>
        </div>
      </div>
    </main>

  );
}
