import styles from './under-construction.module.css';
import BackgroundVideo from './components/BackgroundVideo';
import RevealObserver from './components/RevealObserver';

const SWIRL_PATH =
  'M1454.43 71.1655C1530 76.4014 1581.37 75.2844 1656.6 97.1354C1706.7 111.656 1780.8 142.024 1810.28 184.749C1858.91 255.259 1896.95 361.652 1904.62 444.867C1932.33 594.613 1918.41 742.823 1895.48 893.337C1891.68 956.726 1851.94 1029.82 1827.38 1088.67C1784.1 1192.48 1713.52 1333.99 1656.74 1431.24C1617.4 1498.6 1569.27 1552.22 1513.82 1606.53C1503.33 1616.8 1485.46 1625.59 1476.88 1637.81C1446.41 1681.09 1412.28 1705.39 1366.82 1736.94C1207.08 1847.8 1032.08 1924.94 833.427 1932.62C722.597 1936.88 585.589 1885.22 485.315 1838.17C435.916 1814.99 404.672 1770.8 365.196 1735.34C283.843 1662.28 151.318 1535.92 120.779 1424.53C90.8726 1316.74 67.8187 1147.31 87.0996 1042.94C118.414 873.999 172.597 770.608 319.878 680.481C534.221 549.375 666.865 610.46 885.711 675.664C951.857 695.351 1021.31 696.817 1063.11 762.44C1152.27 902.552 1118.77 1005.66 1123.13 1155.83C1123.56 1170.35 1131.44 1180.89 1131.72 1191.71C1132.91 1237.09 1125.53 1304.32 1104.2 1345.02C1091.05 1370.22 1061.21 1415.81 1035.88 1426.7C968.534 1455.81 792.191 1516.69 723.652 1515.64C561.523 1513.12 438.238 1299.01 434.79 1155.34C430.709 982.905 599.804 859.967 764.747 877.071C791.91 879.863 795.076 889.777 808.305 910.86C846.656 972.224 892.747 1092.02 863.967 1161.06C850.597 1193.18 813.513 1215.38 782.973 1189.62C733.011 1147.52 779.384 1044.62 732.448 995.471C689.594 1005.94 622.251 1022.49 587.349 1049.72C542.665 1084.62 560.116 1202.46 576.512 1249.52C589.178 1285.75 636.395 1370.01 665.528 1393.47C702.753 1423.42 756.162 1387.67 793.598 1376.57C841.238 1362.47 917.095 1348.72 958.964 1327.71C1016.81 1298.66 1013.71 1161.55 1013.92 1105.56C1014.2 1040.99 1013.5 974.388 995.556 910.93C990.63 893.546 971.63 838.884 961.005 827.435C952.279 818.08 932.506 813.263 920.261 809.005C841.027 781.289 725.271 743.242 644.84 724.323C564.409 705.404 496.222 716.155 419.098 751.48C205.67 849.286 178.367 1015.37 211.441 1231.09C218.266 1275.56 241.066 1386.42 258.376 1424.53C267.313 1444.22 288.072 1456.51 301.371 1472.56C329.8 1506.98 344.085 1520.32 376.736 1551.94C426.627 1600.32 470.256 1653.66 532.532 1687.1C685.653 1769.26 798.454 1792.79 973.812 1763.54C1184.99 1728.21 1431.63 1527.79 1544.43 1351.16C1639.78 1201.9 1742.73 994.634 1766.79 819.895C1785.86 681.04 1802.54 360.186 1730.06 241.506C1724.64 232.64 1714.86 224.96 1709.3 215.745C1656.95 220.911 1604.17 188.658 1554.84 184.19C1410.52 171.136 1283.57 179.094 1140.37 137.766C1116.94 130.994 1095.34 122.617 1095.76 96.0184C1096.15 70.301 1150.12 35.2425 1175.77 34.1653C1193.78 33.3974 1201.74 42.822 1212.57 43.5201C1221.86 44.1484 1287.79 55.5771 1299.54 56.2752C1380.08 61.0061 1356.07 64.1536 1454.43 71.1655Z';

export default function UnderConstruction() {
  return (
    <main className={styles.page}>
      <RevealObserver />
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>

      <section className={styles.wrap}>
        <BackgroundVideo
          className={styles.bg}
          poster="/Joli_Texture_03_poster.jpg"
          src="/Joli_Texture_03.mp4"
        />

        <div className={styles.inner}>
          <div className={styles.fadeWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/JOLI_Lockup_Black.png"
              alt="JOLI"
              className={styles.lockup}
            />
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
            </div>
          </div>
        </div>

        <div className={styles.scrollCue} aria-hidden="true" />
      </section>

      <section className={styles.manifesto}>
        <svg className={`${styles.mark} ${styles.reveal}`} data-reveal viewBox="0 0 2000 2000" aria-hidden="true">
          <path d={SWIRL_PATH} />
        </svg>

        <p className={`${styles.lead} ${styles.reveal}`} data-reveal>
          There is a particular kind of disconnection that has become so ordinary we no
          longer notice it. The half-present conversation, one eye on a screen. The evening
          that passes without anyone quite landing in it.
        </p>
      </section>

      <section className={styles.moment}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`${styles.imgLeft} ${styles.reveal}`}
          data-reveal
          src="/Joli_Tote.jpg"
          alt="A JOLI tote bag hanging on a cantilever chair against a raw concrete wall."
          loading="lazy"
        />
      </section>

      <section className={styles.passage}>
        <p className={styles.reveal} data-reveal>
          JOLI is a response to that disconnection.
        </p>
        <p className={styles.reveal} data-reveal>
          A space that asks nothing of you. A moment to inhabit, not to get through.
        </p>
        <p className={styles.reveal} data-reveal>
          Shaped by the slow movement, which treats attention as a practice rather than a
          luxury. And by an understanding that the body and mind must arrive in the same
          place before anything real can happen.
        </p>
        <p className={styles.reveal} data-reveal>
          Everything is chosen for what it produces in you. The person seated beside you.
          The weight of the vessel you&apos;re holding. The light in the room. None of it is
          incidental.
        </p>
      </section>

      <section className={styles.passage}>
        <p className={styles.reveal} data-reveal>
          JOLI brings together the right artists, brands, and spaces.
          <br />
          A room that can&apos;t simply be booked.
        </p>
      </section>

      <section className={styles.moment}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`${styles.imgRight} ${styles.reveal}`}
          data-reveal
          src="/Joli_Vessel.jpg"
          alt="A hand-formed dark clay vessel with looped handles, on a concrete plinth in soft daylight."
          loading="lazy"
        />
      </section>

      <section className={`${styles.passage} ${styles.passageClose}`}>
        <p className={styles.reveal} data-reveal>
          The occasion invites you to be present. That is all it asks.
        </p>
      </section>

      <section className={styles.occasion}>
        <figure className={`${styles.occasionFigure} ${styles.reveal}`} data-reveal>
          <figcaption className={styles.occasionLabel}>Occasion 001</figcaption>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.occasionImg}
            src="/1014_Joli_SakiTasting.jpg"
            alt="An intimate evening of Saki Tasting presented by Erika Haigh & Mai. Invitation only. JOLI — 10 14."
            loading="lazy"
          />
        </figure>
      </section>

      <footer className={styles.siteFooter}>
        <a className={styles.footerLink} href="mailto:info@jolicollective.net">
          info@jolicollective.net
        </a>
        <a className={styles.footerLink} href="mailto:partnerships@jolicollective.net">
          partnerships@jolicollective.net
        </a>
        <a
          className={styles.footerLink}
          href="https://instagram.com/joli.collective"
          target="_blank"
          rel="noopener noreferrer"
        >
          @joli.collective
        </a>
      </footer>
    </main>
  );
}
