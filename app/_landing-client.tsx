'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './page.module.css';

const SUPABASE_ASSETS =
  'https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets';
const APP_URL = 'https://app.jolicollective.net';

const HERO_IMAGE = `${SUPABASE_ASSETS}/Landing1.jpeg`;
const SCREENSHOT_PLAN = `${SUPABASE_ASSETS}/Platform2.jpg`;
const SCREENSHOT_CHAT = `${SUPABASE_ASSETS}/Platform4.jpg`;
const SCREENSHOT_PLANS_LIST = `${SUPABASE_ASSETS}/Platform3.jpg`;

const TRUSTPILOT_URL = 'https://uk.trustpilot.com/review/jolicollective.net';

const testimonials = [
  {
    quote: 'Jolicollective takes the brain strain out of planning a trip.',
    name: 'Laura',
    context: 'Trip to Italy',
  },
  {
    quote:
      'It actually filtered for the things we genuinely enjoy. It took all the guesswork out of planning.',
    name: 'Nicole',
    context: 'Trip to Turin',
  },
  {
    quote:
      "It\u2019s like being taken by the hand by someone who really understands you.",
    name: 'Ali',
    context: 'Multiple trips',
  },
];

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
      { threshold: 0.12 }
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
    <div className={styles.pageWrap}>
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
          <div className={styles.navLinks}>
            <a
              href={`${APP_URL}/how-it-works`}
              className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : styles.navLinkHero}`}
            >
              How it works
            </a>
            <a
              href={`${APP_URL}/pricing`}
              className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : styles.navLinkHero}`}
            >
              Pricing
            </a>
          </div>
          <a
            href={`${APP_URL}/how-it-works`}
            className={`${styles.btnPill} ${scrolled ? styles.btnPillSolid : styles.btnPillGhostWhite}`}
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
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4v10m0 0l-4-4m4 4l4-4" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ──────────── COMBINED: PITCH + HOW IT WORKS ──────────── */}
      <section className={`${styles.card} ${styles.combined} ${styles.revealSection}`} ref={setRef(0)}>
        <div className={styles.combinedInner}>
          <div className={styles.combinedLeft}>
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
            <div data-stagger className={`${styles.chatScreenshot} ${styles.staggerChild}`}>
              <div className={styles.browserFrame}>
                <div className={styles.browserChrome}>
                  <div className={styles.browserDots}><span /><span /><span /></div>
                  <div className={styles.browserUrl}>app.jolicollective.net</div>
                </div>
                <div className={styles.browserBody}>
                  <img src={SCREENSHOT_CHAT} alt="JOLI trip intake conversation" className={styles.screenshotImg} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.combinedSteps}>
            <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>How it works</span>
            {[
              { num: '01', title: 'Describe your trip', desc: 'A quick conversation — not a form.' },
              { num: '02', title: 'Your plan is built', desc: 'Accommodation, restaurants, and day-by-day logistics — matched to what you told us.' },
              { num: '03', title: 'Your plan arrives', desc: 'Ready in minutes. Edit it or go as-is.' },
            ].map((step) => (
              <div key={step.num} data-stagger className={`${styles.step} ${styles.staggerChild}`}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
            <div data-stagger className={`${styles.combinedCta} ${styles.staggerChild}`}>
              <a href={`${APP_URL}/how-it-works`} className={styles.btnPillSolid}>Plan a trip</a>
              <a href={`${APP_URL}/pricing`} className={styles.textLink}>View pricing →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── PRODUCT: TRIP PLAN ──────────────────── */}
      <section className={`${styles.card} ${styles.product} ${styles.revealSection}`} ref={setRef(1)}>
        <div className={styles.productInner}>
          <div className={styles.productText}>
            <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>Your trip plan</span>
            <h2 data-stagger className={`${styles.productTitle} ${styles.staggerChild}`}>Every detail in one place</h2>
            <p data-stagger className={`${styles.productBody} ${styles.staggerChild}`}>
              Day-by-day itinerary with accommodation, restaurants, and
              experiences. Use the copilot to change anything — swap a hotel,
              add a day, ask a question.
            </p>
          </div>
          <div data-stagger className={`${styles.productScreenshot} ${styles.staggerChild}`}>
            <div className={styles.browserFrame}>
              <div className={styles.browserChrome}>
                <div className={styles.browserDots}><span /><span /><span /></div>
                <div className={styles.browserUrl}>app.jolicollective.net</div>
              </div>
              <div className={styles.browserBody}>
                <img src={SCREENSHOT_PLAN} alt="JOLI trip plan with day-by-day itinerary" className={styles.screenshotImg} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── YOUR PLANS: LIST VIEW ──────────────────── */}
      <section className={`${styles.card} ${styles.plansSection} ${styles.revealSection}`} ref={setRef(2)}>
        <div className={styles.plansInner}>
          <div className={styles.plansText}>
            <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>Your plans</span>
            <h2 data-stagger className={`${styles.productTitle} ${styles.staggerChild}`}>All your trips, one place</h2>
            <p data-stagger className={`${styles.productBody} ${styles.staggerChild}`}>
              Every plan you&rsquo;ve built lives in your account. Come back to
              edit, extend, or start a new one.
            </p>
          </div>
          <div data-stagger className={`${styles.plansScreenshot} ${styles.staggerChild}`}>
            <div className={styles.browserFrame}>
              <div className={styles.browserChrome}>
                <div className={styles.browserDots}><span /><span /><span /></div>
                <div className={styles.browserUrl}>app.jolicollective.net/trips</div>
              </div>
              <div className={styles.browserBody}>
                <img src={SCREENSHOT_PLANS_LIST} alt="JOLI trip plans dashboard" className={styles.screenshotImg} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── TESTIMONIALS ──────────────────── */}
      <section className={`${styles.card} ${styles.testimonials} ${styles.revealSection}`} ref={setRef(3)}>
        <div className={styles.testimonialsInner}>
          <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild} ${styles.testimonialEyebrow}`}>
            What people say
          </span>
          <div className={styles.quoteGrid}>
            {testimonials.map((t, i) => (
              <blockquote key={i} data-stagger className={`${styles.quoteCard} ${styles.staggerChild}`}>
                <p className={styles.quoteText}>&ldquo;{t.quote}&rdquo;</p>
                <footer className={styles.quoteFooter}>
                  <span className={styles.quoteName}>{t.name}</span>
                  <span className={styles.quoteContext}>{t.context}</span>
                </footer>
              </blockquote>
            ))}
          </div>
          <div data-stagger className={`${styles.trustpilot} ${styles.staggerChild}`}>
            <div className={styles.trustpilotStars}>
              {[1, 2, 3, 4].map((n) => (
                <svg key={n} width="16" height="16" viewBox="0 0 24 24" fill="var(--brand)" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.trustpilotLink}
            >
              Rated 4 out of 5 on Trustpilot
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────── CLOSING ──────────────────────────── */}
      <section className={`${styles.card} ${styles.closing} ${styles.revealSection}`} ref={setRef(4)}>
        <div className={styles.closingInner}>
          <div className={styles.closingRule} />
          <h2 data-stagger className={`${styles.closingHeadline} ${styles.staggerChild}`}>
            A trip plan you&rsquo;ll actually use.
          </h2>
          <a data-stagger href={`${APP_URL}/how-it-works`} className={`${styles.btnPillSolid} ${styles.staggerChild}`}>
            Plan a trip
          </a>
        </div>
      </section>

      {/* ──────────────────────────── FOOTER ──────────────────────────── */}
      <footer className={`${styles.card} ${styles.footer}`}>
        <div className={styles.footerInner}>
          <a href="https://jolicollective.net" className={styles.footerLogo}>
            <img src={`${SUPABASE_ASSETS}/JOLI_Wordmark_Black.svg`} alt="JOLI" className={styles.footerLogoImg} />
          </a>
          <div className={styles.footerLinks}>
            <a href={`${APP_URL}/how-it-works`}>How it works</a>
            <span className={styles.footerDot}>·</span>
            <a href={`${APP_URL}/pricing`}>Pricing</a>
            <span className={styles.footerDot}>·</span>
            <a href="https://www.instagram.com/jolicollective/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <p className={styles.footerCopy}>&copy; 2026 JOLI Collective</p>
        </div>
      </footer>
    </div>
  );
}
