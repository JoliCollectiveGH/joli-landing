'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './page.module.css';

const SUPABASE_ASSETS =
  'https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets';
const APP_URL = 'https://app.jolicollective.net';
const TRUSTPILOT_URL = 'https://uk.trustpilot.com/review/jolicollective.net';

const TESTIMONIALS = [
  {
    quote: 'Great suggestions within budget plus options if I fancied treating myself.',
    name: 'Peter',
  },
  {
    quote: 'An incredibly inspiring programme, even with my very basic details.',
    name: 'Laura',
  },
  {
    quote:
      'It actually filtered for the things we genuinely enjoy. It took all the guesswork out of planning.',
    name: 'Nicole',
  },
  {
    quote:
      'It\u2019s like being taken by the hand by someone who really understands you.',
    name: 'Ali',
  },
];

const FAQS = [
  {
    q: 'What is JOLI?',
    a: 'JOLI is a premium trip planning service. Tell us where you\'re going and what kind of experience you\'re after — and we build a complete, personalised plan: accommodation, dining, activities, and logistics.',
  },
  {
    q: 'How does it work?',
    a: 'Start a conversation with JOLI, answer a few questions about your trip, and your plan is built in minutes — powered by AI working within our proprietary curated datasets.',
  },
  {
    q: 'How much does it cost?',
    a: 'A single trip plan is £5 with no subscription. Monthly plans start at £9/month with copilot editing included.',
  },
  {
    q: 'Can I edit my plan?',
    a: 'Yes. Paid plans include access to the copilot — an in-plan AI editor that can swap recommendations, add days, or rework any section based on your feedback.',
  },
  {
    q: 'Where do you cover?',
    a: 'JOLI plans trips worldwide. Our curated database is strongest across Europe, but we research and build plans for any destination.',
  },
  {
    q: 'Is JOLI just AI?',
    a: 'JOLI is AI-powered — that\'s how we deliver plans in minutes. But the AI works within proprietary datasets we\'ve built ourselves, with quality filters we set. The result feels curated because the system behind it is curated.',
  },
];

export default function LandingClient() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
              (child as HTMLElement).style.transitionDelay = `${i * 0.15}s`;
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
          <div className={styles.navPills}>
            <a href={`${APP_URL}/how-it-works`} className={`${styles.navPill} ${scrolled ? styles.navPillScrolled : styles.navPillHero}`}>How it works</a>
            <a href={`${APP_URL}/membership`} className={`${styles.navPill} ${scrolled ? styles.navPillScrolled : styles.navPillHero}`}>Pricing</a>
            <a href={`${APP_URL}/request`} className={`${styles.navPill} ${scrolled ? styles.navPillScrolled : styles.navPillHero}`}>Plan a trip</a>
          </div>
        </div>
      </nav>

      {/* ──────────────────────────── HERO ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <img src={`${SUPABASE_ASSETS}/JOLI_Symbol_White_Clean.svg`} alt="" className={styles.heroSymbol} />
          <h1 className={styles.heroHeadline}>Personalised travel planning</h1>
          <p className={styles.heroSub}>Where to stay. Where to eat. What&rsquo;s worth your time.</p>
          <a href={`${APP_URL}/request`} className={styles.btnPillGhostWhite}>Plan a trip</a>
        </div>
        <div className={styles.scrollHint}>
          <svg width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4v10m0 0l-4-4m4 4l4-4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ──────────────────── HOW IT WORKS ──────────────────── */}
      <section className={`${styles.cardFirst} ${styles.howSection} ${styles.revealSection}`} ref={setRef(0)}>
        <div className={styles.howInner}>
          <span data-stagger className={`${styles.eyebrow} ${styles.eyebrowCentre} ${styles.staggerChild}`}>How it works</span>
          <div className={styles.stepsRow}>
            {[
              { num: '01', title: 'Describe your trip', desc: 'A quick conversation with our AI — not a form.' },
              { num: '02', title: 'Your plan is built instantly', desc: 'Day-by-day itinerary with accommodation, restaurants, and experiences — matched to what you told us.' },
              { num: '03', title: 'Your plan arrives', desc: 'Use the copilot to change anything — swap a hotel, add a day, ask a question.' },
            ].map((step) => (
              <div key={step.num} data-stagger className={`${styles.stepCard} ${styles.staggerChild}`}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────── WHAT PEOPLE SAY ──────────────────── */}
      <section className={`${styles.section} ${styles.testimonials} ${styles.revealSection}`} ref={setRef(1)}>
        <div className={styles.testimonialsInner}>
          <div className={styles.testimonialsLayout}>
            <div className={styles.quotesCol}>
              <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>What people say</span>
              <div className={styles.quoteGrid}>
                {TESTIMONIALS.map((t) => (
                  <blockquote key={t.name} data-stagger className={`${styles.quote} ${styles.staggerChild}`}>
                    <p className={styles.quoteText}>&ldquo;{t.quote}&rdquo;</p>
                    <cite className={styles.quoteCite}>— {t.name}</cite>
                  </blockquote>
                ))}
              </div>
              <div data-stagger className={`${styles.trustpilot} ${styles.staggerChild}`}>
                <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className={styles.trustpilotLink}>
                  <span className={styles.trustpilotStars}>★★★★</span>
                  <span className={styles.trustpilotText}>Rated 4/5 on Trustpilot</span>
                </a>
              </div>
            </div>
            <div data-stagger className={`${styles.screenshotCol} ${styles.staggerChild}`}>
              <div className={styles.screenshotFrame}>
                <div className={styles.screenshotChrome}>
                  <div className={styles.screenshotDots}><span /><span /><span /></div>
                  <div className={styles.screenshotUrl}>app.jolicollective.net/trips</div>
                </div>
                <div className={styles.screenshotBody}>
                  <img src={`${SUPABASE_ASSETS}/Platform3.jpg`} alt="JOLI trip plans" className={styles.screenshotImg} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── FAQ ──────────────────── */}
      <section className={`${styles.section} ${styles.faqSection} ${styles.revealSection}`} ref={setRef(2)}>
        <div className={styles.faqInner}>
          <span data-stagger className={`${styles.eyebrow} ${styles.eyebrowCentre} ${styles.staggerChild}`}>Questions</span>
          <h2 data-stagger className={`${styles.faqHeadline} ${styles.staggerChild}`}>Frequently asked</h2>
          <div data-stagger className={`${styles.faqList} ${styles.staggerChild}`}>
            {FAQS.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    className={`${styles.faqChevron} ${openFaq === i ? styles.faqChevronOpen : ''}`}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────── FOOTER ──────────────────────────── */}
      <footer className={`${styles.section} ${styles.footer}`}>
        <div className={styles.footerInner}>
          <a href="https://jolicollective.net" className={styles.footerLogo}>
            <img src={`${SUPABASE_ASSETS}/JOLI_Wordmark_Black.svg`} alt="JOLI" className={styles.footerLogoImg} />
          </a>
          <div className={styles.footerLinks}>
            <a href={`${APP_URL}/how-it-works`}>How it works</a>
            <span className={styles.footerDot}>·</span>
            <a href={`${APP_URL}/membership`}>Pricing</a>
            <span className={styles.footerDot}>·</span>
            <a href="https://www.instagram.com/jolicollective/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
          <p className={styles.footerCopy}>&copy; 2026 JOLI Collective</p>
        </div>
      </footer>
    </div>
  );
}
