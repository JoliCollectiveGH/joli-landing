'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './page.module.css';

const SUPABASE_ASSETS =
  'https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets';
const APP_URL = 'https://app.jolicollective.net';

const HERO_IMAGE = `${SUPABASE_ASSETS}/Landing1.jpeg`;
const PRODUCT_SCREENSHOT = `${SUPABASE_ASSETS}/Platform2.jpg`;

export default function LandingClient() {
  const [scrolled, setScrolled] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = revealRefs.current.filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.classList.add(styles.revealed);
            const children = el.querySelectorAll('[data-stagger]');
            children.forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 0.12}s`;
              (child as HTMLElement).classList.add(styles.staggerRevealed);
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const setRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      revealRefs.current[i] = el;
    },
    []
  );

  return (
    <>
      {/* ──────────────────────────── NAV ──────────────────────────── */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navInner}>
          <a href="https://jolicollective.net" className={styles.navLogo}>
            <img
              src={`${SUPABASE_ASSETS}/JOLI_Wordmark_Black.svg`}
              alt="JOLI"
              className={`${styles.logoImg} ${scrolled ? styles.logoScrolled : styles.logoHero}`}
            />
          </a>
          <a
            href={`${APP_URL}/how-it-works`}
            className={`${styles.btnPill} ${scrolled ? styles.btnPillSolid : styles.btnPillGhost}`}
          >
            Plan a trip
          </a>
        </div>
      </nav>

      {/* ──────────────────────────── HERO ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={HERO_IMAGE} alt="" className={styles.heroBgImg} />
          <div className={styles.heroScrim} />
        </div>
        <div className={styles.heroContent}>
          <img
            src={`${SUPABASE_ASSETS}/JOLI_Symbol_White_Clean.svg`}
            alt=""
            className={styles.heroSymbol}
          />
          <h1 className={styles.heroHeadline}>Personalised travel planning</h1>
          <p className={styles.heroSub}>
            Where to stay. Where to eat. What&rsquo;s worth your time.
          </p>
          <a href={`${APP_URL}/how-it-works`} className={styles.btnPillGhostWhite}>
            Plan a trip
          </a>
        </div>
        <div className={styles.scrollHint}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4v10m0 0l-4-4m4 4l4-4"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* ──────────────── COMBINED: PITCH + HOW IT WORKS ──────────────── */}
      <section className={`${styles.combined} ${styles.revealSection}`} ref={setRef(0)}>
        <div className={styles.combinedInner}>
          {/* Left column: editorial pitch */}
          <div className={styles.combinedPitch}>
            <p data-stagger className={styles.staggerChild}>
              Describe your trip. Your plan arrives in minutes — accommodation,
              restaurants, things to do, day by day.
            </p>
            <p data-stagger className={styles.staggerChild}>
              It&rsquo;s not a static document. Ask the copilot to swap a hotel,
              add a dinner, extend by a day. The plan updates as you go.
            </p>
            <p data-stagger className={`${styles.pitchKicker} ${styles.staggerChild}`}>
              No booking engine. No sponsored results. Just a plan built around
              places we&rsquo;d actually send a friend.
            </p>
          </div>

          {/* Right column: steps */}
          <div className={styles.combinedSteps}>
            <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>
              How it works
            </span>
            {[
              {
                num: '01',
                title: 'Describe your trip',
                desc: 'A quick conversation — not a form.',
              },
              {
                num: '02',
                title: 'Your plan is built',
                desc: 'Accommodation, restaurants, and day-by-day logistics — matched to what you told us.',
              },
              {
                num: '03',
                title: 'Your plan arrives',
                desc: 'Ready in minutes. Edit it or go as-is.',
              },
            ].map((step) => (
              <div key={step.num} data-stagger className={`${styles.step} ${styles.staggerChild}`}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
            <div data-stagger className={`${styles.combinedCta} ${styles.staggerChild}`}>
              <a href={`${APP_URL}/how-it-works`} className={styles.btnPillSolid}>
                Plan a trip
              </a>
              <a href={`${APP_URL}/pricing`} className={styles.textLink}>
                View pricing →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────── PRODUCT ──────────────────────────── */}
      <section className={`${styles.product} ${styles.revealSection}`} ref={setRef(1)}>
        <div className={styles.productInner}>
          <div className={styles.productText}>
            <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>
              Your trip plan
            </span>
            <h2 data-stagger className={`${styles.productTitle} ${styles.staggerChild}`}>
              Every detail in one place
            </h2>
            <p data-stagger className={`${styles.productBody} ${styles.staggerChild}`}>
              Day-by-day itinerary with accommodation, restaurants, and
              experiences. Use the copilot to change anything — swap a hotel,
              add a day, ask a question.
            </p>
          </div>
          <div data-stagger className={`${styles.productScreenshot} ${styles.staggerChild}`}>
            <div className={styles.browserFrame}>
              <div className={styles.browserChrome}>
                <div className={styles.browserDots}>
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.browserUrl}>
                  app.jolicollective.net
                </div>
              </div>
              <div className={styles.browserBody}>
                <img
                  src={PRODUCT_SCREENSHOT}
                  alt="JOLI trip plan showing a day-by-day itinerary"
                  className={styles.screenshotImg}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────── CLOSING ──────────────────────────── */}
      <section className={`${styles.closing} ${styles.revealSection}`} ref={setRef(2)}>
        <div className={styles.closingInner}>
          <div className={styles.closingRule} />
          <h2 data-stagger className={`${styles.closingHeadline} ${styles.staggerChild}`}>
            A trip plan you&rsquo;ll actually use.
          </h2>
          <a
            data-stagger
            href={`${APP_URL}/how-it-works`}
            className={`${styles.btnPillSolid} ${styles.staggerChild}`}
          >
            Plan a trip
          </a>
        </div>
      </section>

      {/* ──────────────────────────── FOOTER ──────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <a href="https://jolicollective.net" className={styles.footerLogo}>
            <img
              src={`${SUPABASE_ASSETS}/JOLI_Wordmark_Black.svg`}
              alt="JOLI"
              className={styles.footerLogoImg}
            />
          </a>
          <div className={styles.footerLinks}>
            <a href={`${APP_URL}/how-it-works`}>How it works</a>
            <span className={styles.footerDot}>·</span>
            <a href={`${APP_URL}/pricing`}>Pricing</a>
            <span className={styles.footerDot}>·</span>
            <a
              href="https://www.instagram.com/jolicollective/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
          <p className={styles.footerCopy}>&copy; 2026 JOLI Collective</p>
        </div>
      </footer>
    </>
  );
}
