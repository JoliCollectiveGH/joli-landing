'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './page.module.css';
import PhoneMockup from './components/PhoneMockup';

const SUPABASE_ASSETS =
  'https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/Assets';
const APP_URL = 'https://app.jolicollective.net';
const TRUSTPILOT_URL = 'https://uk.trustpilot.com/review/jolicollective.net';

const TESTIMONIALS = [
  {
    quote: 'Great suggestions within budget plus options if I fancied treating myself.',
    name: 'Peter, Cape Town',
  },
  {
    quote: 'An incredibly inspiring programme, even with my very basic details.',
    name: 'Laura, Germany & the Netherlands',
  },
  {
    quote:
      'It actually filtered for the things we genuinely enjoy. It took all the guesswork out of planning.',
    name: 'Nicole, Turin',
  },
];


type MenuAuthStatus = 'loading' | 'signedIn' | 'signedOut';

export default function LandingClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<MenuAuthStatus>('loading');
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(o => !o);
  }, []);

  // Fetch auth state once on mount — drives the menu's auth-aware items.
  useEffect(() => {
    let cancelled = false;
    fetch(`${APP_URL}/api/auth/whoami`, { credentials: 'include', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        setAuthStatus(data && data.signedIn ? 'signedIn' : 'signedOut');
      })
      .catch(() => {
        if (!cancelled) setAuthStatus('signedOut');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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
      <div>
        <nav className={styles.navPill}>
          <a href="/" className={styles.navLogo} aria-label="JOLI Collective home">
            <img
              src={`${SUPABASE_ASSETS}/JOLI_Lockup_White_Clean.svg`}
              alt="JOLI"
              className={styles.navLogoImg}
            />
          </a>

          <div className={styles.navLinks}>
            <a href={`${APP_URL}/how-it-works`} className={styles.navLink}>How it works</a>
            <a href={`${APP_URL}/pricing`} className={styles.navLink}>Pricing</a>
            <a href={`${APP_URL}/about`} className={styles.navLink}>About</a>
          </div>

          <a href={`${APP_URL}/request`} className={styles.navCta}>
            Plan with JOLI
          </a>

          <button
            type="button"
            className={styles.navHamburger}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="8" x2="20" y2="8"/>
                <line x1="4" y1="16" x2="20" y2="16"/>
              </svg>
            )}
          </button>
        </nav>

        {menuOpen && (
          <div className={styles.mobileMenu}>
            <div className={styles.mobileMenuInner}>
              {/* Primary action — content-hugging terracotta pill, left-aligned */}
              <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                <a
                  href={`${APP_URL}/request`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '10px 18px',
                    borderRadius: '999px',
                    background: '#AD531B',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: 500,
                    letterSpacing: '-0.01em',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#92461A'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#AD531B'; }}
                >
                  Plan with JOLI
                </a>

                {authStatus === 'signedOut' && (
                  <a
                    href={`${APP_URL}/auth/login?next=/account`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: '13px',
                      color: '#6B6560',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#1A1814'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6560'; }}
                  >
                    Sign in
                  </a>
                )}

                {authStatus === 'signedIn' && (
                  <a
                    href={`${APP_URL}/account`}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      fontSize: '13px',
                      color: '#6B6560',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#1A1814'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#6B6560'; }}
                  >
                    Account
                  </a>
                )}
              </nav>

              {/* Footer section inside menu */}
              <div className={styles.mobileMenuFooter}>
                <div className={styles.mobileMenuFooterCols}>
                  <div className={styles.mobileMenuFooterCol}>
                    <h4 className={styles.mobileMenuFooterHeading}>Product</h4>
                    <a href={`${APP_URL}/how-it-works`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>How it works</a>
                    <a href={`${APP_URL}/pricing`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>Pricing</a>
                  </div>
                  <div className={styles.mobileMenuFooterCol}>
                    <h4 className={styles.mobileMenuFooterHeading}>Integrations</h4>
                    <a href={`${APP_URL}/hospitable`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>Hospitable</a>
                  </div>
                  <div className={styles.mobileMenuFooterCol}>
                    <h4 className={styles.mobileMenuFooterHeading}>Company</h4>
                    <a href={`${APP_URL}/about`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>About</a>
                    <a href="mailto:info@jolicollective.net" className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>Contact</a>
                  </div>
                  <div className={styles.mobileMenuFooterCol}>
                    <h4 className={styles.mobileMenuFooterHeading}>Resources</h4>
                    <a href={`${APP_URL}/faq`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>FAQ</a>
                  </div>
                  <div className={styles.mobileMenuFooterCol}>
                    <h4 className={styles.mobileMenuFooterHeading}>Legal</h4>
                    <a href={`${APP_URL}/privacy`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>Privacy</a>
                    <a href={`${APP_URL}/terms`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>Terms</a>
                  </div>
                </div>

                {/* Social icons row */}
                <div className={styles.mobileMenuSocials}>
                  <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className={styles.mobileMenuSocialLink} aria-label="Trustpilot reviews">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>Trustpilot</span>
                  </a>
                  <a href="https://www.instagram.com/joli.collective/" target="_blank" rel="noopener noreferrer" className={styles.mobileMenuSocialLink} aria-label="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="2" width="20" height="20" rx="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                </div>

                {/* Bottom row */}
                <div className={styles.mobileMenuBottom}>
                  <span>© 2026 JOLI Collective</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ──────────────────────────── HERO ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <p className={styles.preheading}>edited by joli</p>
            <h1 className={styles.heroHeadline}>
              The travel copilot that learns your taste.
            </h1>
            <p className={styles.heroSub}>
              Plans shaped by every trip you take.
            </p>
            <a href={`${APP_URL}/request`} className={styles.heroCta}>
              Plan with JOLI
            </a>
            <a
              href={TRUSTPILOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.trustChip}
            >
              <span className={styles.trustStars} aria-label="5 star rating">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </span>
              <span className={styles.trustText}>5.0 on Trustpilot</span>
            </a>

            {/* Mobile-only voice signature — hidden on desktop where full phone mockup handles this role */}
            <div className={styles.heroBubbleMobile} aria-hidden="true">
              <span className={styles.heroBubbleLabel}>JOLI</span>
              <div className={styles.heroBubble}>
                You liked slow mornings in Lisbon. Keeping that in mind for Rome.
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <PhoneMockup />
          </div>
        </div>
      </section>

      <section className={`${styles.mobilePhoneSection} ${styles.revealSection}`} ref={setRef(3)}>
        <div className={styles.mobilePhoneInner}>
          <div data-stagger className={styles.staggerChild}>
            <PhoneMockup />
          </div>
          <p data-stagger className={`${styles.mobilePhoneCaption} ${styles.staggerChild}`}>How a conversation begins</p>
        </div>
      </section>

      {/* ──────────────────── HOW IT WORKS ──────────────────── */}
      <section className={`${styles.cardFirst} ${styles.howSection} ${styles.revealSection}`} ref={setRef(0)}>
        <div className={styles.howInner}>
          <div className={styles.sectionHeader}>
            <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>How it works</span>
          </div>
          <div className={styles.stepsRow}>
            {[
              { num: '01', title: 'Describe your trip', desc: 'A quick conversation to start. Your taste profile learns and sharpens with every trip you plan.' },
              { num: '02', title: 'Get a complete plan', desc: 'An itinerary with handpicked stays, restaurants, and experiences — matched to what you told us.' },
              { num: '03', title: 'Refine with your copilot', desc: 'Swap a hotel, add a day, ask for a quieter dinner. JOLI edits the plan with you, before and during the trip.' },
            ].map((step) => (
              <div key={step.num} data-stagger className={`${styles.stepCard} ${styles.staggerChild}`}>
                <span className={styles.stepNum}>{step.num}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div className={styles.howCta}>
            <a data-stagger href={`${APP_URL}/how-it-works`} className={`${styles.tasteCta} ${styles.staggerChild}`}>
              See how it works →
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────── TASTE PROFILE ──────────────────── */}
      <section className={`${styles.tasteSection} ${styles.revealSection}`} ref={setRef(1)}>
        <div className={styles.howInner}>
          <div className={styles.tasteGrid}>
            <div className={styles.tasteLeft}>
              <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>Your Taste Profile</span>
              <h2 data-stagger className={`${styles.sectionHeadline} ${styles.staggerChild}`}>
                The more you travel with JOLI,<br />the better it gets.
              </h2>
              <p data-stagger className={`${styles.sectionSub} ${styles.staggerChild}`}>
                Tell us your travel style once. Every trip plan you make refines your profile — so recommendations get closer to what you actually want, not just what's popular.
              </p>
              <a data-stagger href={`${APP_URL}/taste-profile`} className={`${styles.tasteCta} ${styles.staggerChild}`}>
                Set up your taste profile →
              </a>
            </div>
            <div data-stagger className={`${styles.tasteRight} ${styles.staggerChild}`}>
              {[
                { label: 'Stays', text: 'Matched to how you like to feel, not just where you want to go.' },
                { label: 'Dining', text: 'Picked for your palate, not the highest rating.' },
                { label: 'Experiences', text: 'Filtered for your pace, your interests, your trip.' },
              ].map((item, i) => (
                <div key={i} className={styles.tasteBenefit}>
                  <span className={styles.tastePill}>{item.label}</span>
                  <p className={styles.tasteBenefitText}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── PRODUCT IN ACTION ──────────────────── */}
      <section className={`${styles.productSection} ${styles.revealSection}`} ref={setRef(4)}>
        <div className={styles.productInner}>

          {/* Mockup 1 — Trip plan day card */}
          <div data-stagger className={`${styles.mockupWrap} ${styles.staggerChild}`}>
            <article className={styles.tripPlanCard}>
              <header className={styles.tripPlanHeader}>
                <span className={styles.tripPlanDayLabel}>Day 2 · Ostuni</span>
                <h3 className={styles.tripPlanDayTitle}>The White City on Foot</h3>
              </header>

              <div className={styles.tripPlanBlock}>
                <span className={styles.tripPlanBlockTime}>MORNING</span>
                <div className={styles.tripPlanItem}>
                  <p className={styles.tripPlanItemTitle}>Centro storico, before the heat</p>
                  <p className={styles.tripPlanItemMeta}>Cathedral of Santa Maria · 15th-century rose window</p>
                </div>
              </div>

              <div className={styles.tripPlanBlock}>
                <span className={styles.tripPlanBlockTime}>MIDDAY</span>
                <div className={styles.tripPlanItem}>
                  <p className={styles.tripPlanItemTitle}>Pizzeria Ostuni</p>
                  <p className={styles.tripPlanItemMeta}>Wood-fired, local, unfussy — where residents eat</p>
                </div>
              </div>

              <div className={styles.tripPlanBlock}>
                <span className={styles.tripPlanBlockTime}>AFTERNOON</span>
                <div className={styles.tripPlanItem}>
                  <p className={styles.tripPlanItemTitle}>Masseria pool</p>
                  <p className={styles.tripPlanItemMeta}>Deliberately empty. This is the point.</p>
                </div>
              </div>

              <div className={styles.tripPlanBlock}>
                <span className={styles.tripPlanBlockTime}>EVENING</span>
                <div className={styles.tripPlanItem}>
                  <p className={styles.tripPlanItemTitle}>Aperitivo on the terrace</p>
                  <p className={styles.tripPlanItemMeta}>7pm light on the olive groves · the reason to be here</p>
                </div>
              </div>
            </article>
          </div>

          {/* Mockup 2 — Copilot conversation */}
          <div data-stagger className={`${styles.mockupWrap} ${styles.staggerChild}`}>
            <div className={styles.copilotCard}>
              <header className={styles.copilotHeader}>
                <span className={styles.copilotHeaderLogo}>JOLI</span>
                <span className={styles.copilotHeaderContext}>Day 3 · Valle d'Itria</span>
              </header>

              <div className={styles.copilotBody}>
                <div className={styles.copilotMsgUser}>
                  Can we swap Alberobello for something quieter? Crowds aren't really our thing.
                </div>

                <div className={styles.copilotMsgJoli}>
                  <span className={styles.copilotMsgSender}>JOLI</span>
                  <p className={styles.copilotMsgText}>
                    Try Locorotondo or Cisternino instead — circular hilltop towns in the same valley, none of Alberobello's coach traffic. Cisternino has the fornelli pronti butcher-rotisseries for lunch, which is the better meal anyway.
                  </p>
                </div>

                <div className={styles.copilotMsgUser}>
                  Perfect. Swap it.
                </div>

                <div className={styles.copilotMsgStatus}>
                  <span className={styles.copilotStatusDot}></span>
                  Day 3 updated
                </div>
              </div>

              <div className={styles.copilotInput}>
                <span className={styles.copilotInputPlaceholder}>Reply to JOLI…</span>
                <div className={styles.copilotInputSend}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="12" y1="19" x2="12" y2="5"/>
                    <polyline points="5 12 12 5 19 12"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MANIFESTO */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoInner}>
          <div className={styles.manifestoGrid}>
            <div className={styles.manifestoLeft}>
              <div className={styles.sectionHeader}>
                <span className={styles.eyebrow}>Our philosophy</span>
                <h2 className={styles.sectionHeadline}>Like a friend who&apos;s been everywhere.</h2>
              </div>
              <p className={styles.manifestoBody}>
                JOLI is the travel concierge that learns your taste. The more you travel with it, the sharper it gets — building a picture of how you like to move through the world, so every plan feels less like a search result and more like a recommendation from someone who knows you.
              </p>
              <a href="https://app.jolicollective.net/about" className={styles.manifestoCta}>
                Read our story →
              </a>
              <div className={styles.manifestoStanzaLeft}>
                <span className={styles.manifestoSubLabel}>The work</span>
                <p className={styles.manifestoStanzaText}>
                  Taste is a form of currency. The work of curation — the reading, the visiting, the saying no to ninety-nine things — is the art of the edit.
                </p>
              </div>
            </div>
            <div className={styles.manifestoRight}>
              <figure className={styles.manifestoPhotoFigure}>
                <img
                  src="https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public/landingpage/stefan-stefancik-1NwEDhtL_QA-unsplash.jpg"
                  alt="A solitary swimmer in a geothermal pool set into the hills of Iceland — a quiet morning, no one else around."
                  className={styles.manifestoPhotoImg}
                  loading="lazy"
                />
                <figcaption className={styles.manifestoPhotoCaption}>
                  Iceland. A pool no one else was using.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── WHAT PEOPLE SAY ──────────────────── */}
      <section className={`${styles.section} ${styles.testimonials} ${styles.revealSection}`} ref={setRef(2)}>
        <div className={styles.testimonialsInner}>
          <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>What people say</span>

          {/* Hero quote — Ali */}
          <div data-stagger className={`${styles.heroQuoteBlock} ${styles.staggerChild}`}>
            <div className={styles.heroQuoteContent}>
              <svg className={styles.heroQuoteMark} width="48" height="48" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M9.33 8.5L7 12.33V16h3.67v-3.67H9L9.33 8.5zm7.34 0L14.33 12.33V16H18v-3.67h-1.67L16.67 8.5z"/>
              </svg>
              <blockquote className={styles.heroQuoteText}>
                It&apos;s like being taken by the hand by someone who really understands you.
              </blockquote>
              <cite className={styles.heroQuoteCite}>— Ali, on a trip to Galicia</cite>
            </div>
            <img
              src={`${SUPABASE_ASSETS}/JOLI_Symbol_White_Clean.svg`}
              alt=""
              aria-hidden="true"
              className={styles.heroQuoteSwirl}
            />
          </div>

          {/* Compact row — other 3 testimonials */}
          <div className={styles.quoteRow}>
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} data-stagger className={`${styles.quote} ${styles.staggerChild}`}>
                <p className={styles.quoteText}>&ldquo;{t.quote}&rdquo;</p>
                <cite className={styles.quoteCite}>— {t.name}</cite>
              </blockquote>
            ))}
          </div>

          {/* Trustpilot footer */}
          <div data-stagger className={`${styles.trustpilot} ${styles.staggerChild}`}>
            <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className={styles.trustpilotLink}>
              <span className={styles.trustpilotStars} aria-label="5 star rating">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </span>
              <span className={styles.trustpilotText}>Rated 5/5 on Trustpilot</span>
            </a>
          </div>
        </div>
      </section>

      {/* ──────────────────────────── CTA BANNER ──────────────────────────── */}
      <section className={styles.ctaBannerSection}>
        <div className={styles.howInner}>
          <div className={styles.ctaBanner}>
            <div className={styles.ctaBannerLeft}>
              <p className={styles.ctaBannerEyebrow}>JOLI COLLECTIVE</p>
              <h3 className={styles.ctaBannerHeadline}>Your next trip is one<br /> conversation away.</h3>
            </div>
            <div className={styles.ctaBannerBtns}>
              <a href={`${APP_URL}/request`} className={styles.ctaBannerBtn}>
                Plan with JOLI <span className={styles.ctaBannerArrow}>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────── FOOTER ──────────────────────────── */}
      <footer className="relative z-10 w-full bg-white border-t border-[#E0DCD5]">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12 mb-12">
            <div className="col-span-2 md:col-span-1">
              <a href="https://jolicollective.net" className="inline-block">
                <img
                  src={`${SUPABASE_ASSETS}/JOLI_Wordmark_Black.svg`}
                  alt="JOLI"
                  className="h-5 w-auto"
                />
              </a>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-[#AD531B] uppercase tracking-widest mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href={`${APP_URL}/how-it-works`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">How it works</a></li>
                <li><a href={`${APP_URL}/pricing`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-[#AD531B] uppercase tracking-widest mb-4">Integrations</h4>
              <ul className="space-y-3">
                <li><a href={`${APP_URL}/hospitable`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Hospitable</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-[#AD531B] uppercase tracking-widest mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href={`${APP_URL}/about`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">About</a></li>
                <li><a href="mailto:info@jolicollective.net" className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-[#AD531B] uppercase tracking-widest mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href={`${APP_URL}/faq`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">FAQ</a></li>
                <li><a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Trustpilot</a></li>
                <li><a href="https://www.instagram.com/joli.collective/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-[#AD531B] uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href={`${APP_URL}/privacy`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Privacy</a></li>
                <li><a href={`${APP_URL}/terms`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#E0DCD5] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-xs text-[#9A938C]">&copy; 2026 JOLI Collective</p>
            <p className="text-xs text-[#9A938C] italic">Made with care in London</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
