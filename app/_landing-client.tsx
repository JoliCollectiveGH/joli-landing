'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const STRIPE = {
  monthly:   'https://buy.stripe.com/5kQeVdcswcRH7Ob8dl6J202',
  annual:    'https://buy.stripe.com/cNi9AT3W0bND9WjfFN6J201',
  concierge: 'https://buy.stripe.com/14A9AT6485pfd8vbpx6J203',
};

const CONTACT_EMAIL = ['hello', 'jolicollective.net'].join('@');

const SHOWCASE_ITEMS = [
  { src: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80&auto=format', alt: 'Villa Lena',        location: 'Tuscany, Italy',        name: 'Villa Lena' },
  { src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80&auto=format', alt: 'Casa do Pego',      location: 'Comporta, Portugal',    name: 'Casa do Pego' },
  { src: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=600&q=80&auto=format', alt: 'Son Brull',         location: 'Mallorca, Spain',       name: 'Son Brull' },
  { src: 'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?w=600&q=80&auto=format', alt: 'Masseria Potenti',  location: 'Puglia, Italy',         name: 'Masseria Potenti' },
  { src: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=600&q=80&auto=format', alt: 'Whitepod',          location: 'Valais, Switzerland',   name: 'Whitepod' },
];

const CHIPS = ['Romantic escape', 'Family villa', 'Design hotel', 'Off the beaten track', 'Group celebration', 'Surprise me'];

const CHECK_ICON = (
  <svg className={styles.featureCheck} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function LandingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Drag-to-scroll on showcase strip
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;
    let isDown = false, startX = 0, scrollLeft = 0;

    const down  = (e: MouseEvent) => { isDown = true; startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft; };
    const up    = () => { isDown = false; };
    const move  = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
    };

    el.addEventListener('mousedown',  down);
    el.addEventListener('mouseleave', up);
    el.addEventListener('mouseup',    up);
    el.addEventListener('mousemove',  move);
    return () => {
      el.removeEventListener('mousedown',  down);
      el.removeEventListener('mouseleave', up);
      el.removeEventListener('mouseup',    up);
      el.removeEventListener('mousemove',  move);
    };
  }, []);

  const memberPrice  = billing === 'monthly' ? '£15'  : '£120';
  const memberPeriod = billing === 'monthly' ? 'per month' : 'per year';

  return (
    <>
      {/* ── NAVIGATION ── */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLogo}>
          <img
            src="https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets/JOLI_Wordmark_Black.svg"
            alt="JOLI Collective"
          />
        </Link>
        <div className={styles.navLinks}>
          <a href="#features">How it works</a>
          <a href="#showcase">Collection</a>
          <a href="#membership">Membership</a>
          <Link href="https://app.jolicollective.net" className={styles.navCta}>Start exploring</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          src="https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets/Joli_Texture_06.mp4"
          autoPlay loop muted playsInline
          aria-hidden="true"
        />
        <div className={styles.heroScrim} />
        <img
          className={styles.heroLogo}
          src="https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets/JOLI_Symbol_White.svg"
          alt="JOLI Collective"
        />
      </section>

      {/* ── FEATURES ── */}
      <section className={`${styles.section} ${styles.featuresSection}`} id="features">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className={`${styles.sectionHeader} reveal`}>
            <p className={styles.sectionEyebrow}>How it works</p>
            <h2 className={styles.sectionTitle}>
              From conversation<br />
              <em>to edit.</em>
            </h2>
          </div>

          <div className={`${styles.featuresGrid} reveal-stagger reveal`}>
            <div className={styles.featureCell}>
              <div className={styles.featureNumber}>01</div>
              <h3 className={styles.featureTitle}>Describe your trip</h3>
              <p className={styles.featureDesc}>Mention the vibe, occasion, or location. MILO understands natural language — no filters to wrestle with.</p>
            </div>
            <div className={styles.featureCell}>
              <div className={styles.featureNumber}>02</div>
              <h3 className={styles.featureTitle}>Receive your edit</h3>
              <p className={styles.featureDesc}>A handful of genuinely well-matched properties from our collection, each with a reason for its selection.</p>
            </div>
            <div className={styles.featureCell}>
              <div className={styles.featureNumber}>03</div>
              <h3 className={styles.featureTitle}>Refine or elevate</h3>
              <p className={styles.featureDesc}>Adjust your search, save to collections, or hand off to our concierge for bespoke trip shaping.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── APP MOCKUP ── */}
      <section className={`${styles.section} ${styles.mockupSection}`}>
        <div className={styles.mockupInner}>
          <div className={`${styles.mockupHeader} reveal`}>
            <div>
              <p className={styles.sectionEyebrow}>See it in action</p>
              <h2 className={styles.sectionTitle}>
                Tell MILO what you&apos;re<br /><em>dreaming of.</em>
              </h2>
            </div>
            <Link href="https://app.jolicollective.net" className={`${styles.btn} ${styles.btnPrimary}`}>
              Try it now
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className={`${styles.browserFrame} reveal`}>
            <div className={styles.browserChrome}>
              <div className={styles.chromeDots}>
                <div className={`${styles.chromeDot} ${styles.chromeDotRed}`} />
                <div className={`${styles.chromeDot} ${styles.chromeDotYellow}`} />
                <div className={`${styles.chromeDot} ${styles.chromeDotGreen}`} />
              </div>
              <div className={styles.chromeUrl}>meetmilo.org/start</div>
            </div>
            <div className={styles.browserContent}>
              <h3 className={styles.appHeadline}>Where in Europe are you dreaming of going?</h3>
              <div className={styles.appInputWrap}>
                <div className={styles.appInputPlaceholder}>e.g. A design-led villa in Tuscany for 6...</div>
                <div className={styles.appSendBtn}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </div>
              </div>
              <p className={styles.appTagline}>Handpicked places. Fewer options. Right for you.</p>
              <div className={styles.appChips}>
                {CHIPS.map((chip) => (
                  <div key={chip} className={styles.appChip}>{chip}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHOWCASE ── */}
      <section className={`${styles.section} ${styles.showcaseSection}`} id="showcase">
        <div className={`${styles.showcaseHeader} reveal`}>
          <div>
            <p className={styles.sectionEyebrow}>The Collection</p>
            <h2 className={styles.sectionTitle}>Chosen for character.</h2>
          </div>
          <Link href="/properties" className={`${styles.btn} ${styles.btnGhost}`}>
            View all properties
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className={`${styles.showcaseScroll} reveal`} ref={showcaseRef}>
          {SHOWCASE_ITEMS.map((item) => (
            <div key={item.name} className={styles.showcaseItem}>
              <img src={item.src} alt={item.alt} className={styles.showcaseImage} />
              <div className={styles.showcaseOverlay}>
                <div className={styles.showcaseLocation}>{item.location}</div>
                <div className={styles.showcaseName}>{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEMBERSHIP ── */}
      <section className={`${styles.section} ${styles.membershipSection}`} id="membership">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal" style={{ textAlign: 'center', margin: '0 auto 4rem', maxWidth: '520px' }}>
            <p className={styles.sectionEyebrow} style={{ justifyContent: 'center' }}>Membership</p>
            <h2 className={styles.sectionTitle}>
              Simple plans.<br />
              <em>Start free.</em>
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--ink-muted)', marginTop: '1rem', lineHeight: '1.7' }}>
              Begin with MILO free. Upgrade when travel planning becomes a regular ritual.
            </p>
          </div>

          <div className={`${styles.membershipGrid} reveal-stagger reveal`}>

            {/* Explorer */}
            <div className={styles.membershipCard}>
              <div className={styles.membershipTier}>Explorer</div>
              <div className={styles.membershipPrice}>£0</div>
              <div className={styles.membershipPeriod}>Free forever</div>
              <ul className={styles.membershipFeatures}>
                {['3 conversations per month', 'Basic property details', 'Mood-based search'].map((f) => (
                  <li key={f}>{CHECK_ICON}{f}</li>
                ))}
              </ul>
              <Link href="https://app.jolicollective.net" className={`${styles.btn} ${styles.btnGhost}`} style={{ width: '100%', justifyContent: 'center' }}>
                Start exploring
              </Link>
            </div>

            {/* JOLI Member */}
            <div className={`${styles.membershipCard} ${styles.featured}`}>
              <div className={styles.membershipTier}>JOLI Member</div>

              <div className={styles.billingToggle} role="group" aria-label="Billing frequency">
                <button
                  className={billing === 'monthly' ? styles.active : ''}
                  onClick={() => setBilling('monthly')}
                  aria-pressed={billing === 'monthly'}
                >
                  Monthly
                </button>
                <button
                  className={billing === 'annual' ? styles.active : ''}
                  onClick={() => setBilling('annual')}
                  aria-pressed={billing === 'annual'}
                >
                  Annual <span className={styles.annualBadge}>Save 33%</span>
                </button>
              </div>

              <div className={styles.membershipPrice}>{memberPrice}</div>
              <div className={styles.membershipPeriod}>{memberPeriod}</div>

              <ul className={styles.membershipFeatures}>
                {[
                  'Unlimited conversations',
                  'Full property details & links',
                  'Save collections & favourites',
                  'Priority access to new properties',
                ].map((f) => (
                  <li key={f}>{CHECK_ICON}{f}</li>
                ))}
              </ul>

              <a
                href={STRIPE[billing]}
                className={`${styles.btn} ${styles.btnPrimary}`}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Subscribe
              </a>
            </div>

            {/* Concierge */}
            <div className={styles.membershipCard}>
              <div className={styles.membershipTier}>Concierge</div>
              <div className={styles.membershipPrice}>£250</div>
              <div className={styles.membershipPeriod}>per year</div>
              <ul className={styles.membershipFeatures}>
                {[
                  'Everything in Member',
                  '5 bespoke trip shapings/year',
                  'Human-curated shortlists',
                  'Seasonal occasion nudges',
                ].map((f) => (
                  <li key={f}>{CHECK_ICON}{f}</li>
                ))}
              </ul>
              <a
                href={STRIPE.concierge}
                className={`${styles.btn} ${styles.btnSecondary}`}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Join as Concierge
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <Link href="/" className={styles.footerLogo}>
          <img
            src="https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets/JOLI_Lockup_Black.svg"
            alt="JOLI Collective"
          />
        </Link>
        <div className={styles.footerLinks}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact</a>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--ink-faint)' }}>© 2026 JOLI Collective</p>
      </footer>
    </>
  );
}
