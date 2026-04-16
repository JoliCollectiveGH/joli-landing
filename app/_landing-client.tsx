'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './page.module.css';
import LandingNavAuthSlot from './_LandingNavAuthSlot';

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
    a: 'JOLI is a travel concierge that learns your taste. Tell us where you\'re going, build your taste profile, and we\'ll create a complete personalised plan — stays, dining, experiences, and logistics — that gets sharper every trip.',
  },
  {
    q: 'How does it work?',
    a: 'Start with a quick conversation about your trip. JOLI uses your taste profile — built from your preferences and refined with every plan — to build a complete itinerary matched to what you actually like.',
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
    a: 'JOLI plans trips worldwide. Tell us where you\'re going and we\'ll build you a plan.',
  },
  {
    q: 'Is JOLI just AI?',
    a: 'The plans are generated in minutes, but what makes them feel curated is the taste layer underneath — your preferences, your travel style, your history with JOLI. The more you use it, the better it fits.',
  },
  {
    q: 'How long does a plan take?',
    a: 'Most plans are ready within a few minutes of submission. You\'ll receive an email the moment yours is complete.',
  },
  {
    q: 'Can I request changes after I receive my plan?',
    a: 'Yes. Every plan includes a built-in copilot you can use to swap recommendations, adjust the pace, or ask questions about any part of your itinerary.',
  },
  {
    q: 'Do I need an account to get a plan?',
    a: 'You\'ll need to create a free account to submit a request and receive your plan. It takes under a minute and your plan is saved to your account for easy access.',
  },
];

export default function LandingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [planDropdownOpen, setPlanDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const planDropdownRef = useRef<HTMLDivElement>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  // Close plan dropdown on outside click
  useEffect(() => {
    if (!planDropdownOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (planDropdownRef.current && !planDropdownRef.current.contains(e.target as Node)) {
        setPlanDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [planDropdownOpen]);

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
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.navCapsule}>
            <a href="https://jolicollective.net" className={styles.navLogo}>
              <img
                src={`${SUPABASE_ASSETS}/JOLI_Lockup_White_Clean.svg`}
                alt="JOLI"
                className={styles.navLogoImg}
                style={{ filter: 'invert(1) brightness(0)' }}
              />
            </a>
            {/* Plan a trip — click-toggle dropdown */}
            <div className="relative" ref={planDropdownRef}>
              <button
                onClick={() => setPlanDropdownOpen(o => !o)}
                className={styles.navCta}
              >
                Plan a trip
                <svg
                  width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ opacity: 0.5, marginLeft: 4, display: 'inline', verticalAlign: 'middle', transition: 'transform 150ms', transform: planDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              {planDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                  <div
                    className="border border-[#E0DCD5] rounded-xl shadow-lg py-1.5 min-w-[160px]"
                    style={{ background: 'rgba(247, 246, 242, 0.97)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                  >
                    <a href={`${APP_URL}/request`} className="block px-4 py-2 text-[13px] text-[#6B6560] hover:text-[#1A1814] hover:bg-[#1A1814]/[0.04] transition-colors whitespace-nowrap">New trip</a>
                    <a href={`${APP_URL}/trip-plans`} className="block px-4 py-2 text-[13px] text-[#6B6560] hover:text-[#1A1814] hover:bg-[#1A1814]/[0.04] transition-colors whitespace-nowrap">Trip plans</a>
                    <a href={`${APP_URL}/taste-profile`} className="block px-4 py-2 text-[13px] text-[#6B6560] hover:text-[#1A1814] hover:bg-[#1A1814]/[0.04] transition-colors whitespace-nowrap">Taste profile</a>
                    <a href={`${APP_URL}/how-it-works`} className="block px-4 py-2 text-[13px] text-[#6B6560] hover:text-[#1A1814] hover:bg-[#1A1814]/[0.04] transition-colors whitespace-nowrap">How it works</a>
                    <a href={`${APP_URL}/pricing`} className="block px-4 py-2 text-[13px] text-[#6B6560] hover:text-[#1A1814] hover:bg-[#1A1814]/[0.04] transition-colors whitespace-nowrap">Pricing</a>
                  </div>
                </div>
              )}
            </div>
            <LandingNavAuthSlot scrolled={false} />
            {/* Mobile: hamburger */}
            <button
              onClick={() => setMobileMenuOpen(o => !o)}
              className="md:hidden flex items-center justify-center w-7 h-7 rounded-full ml-1 text-[#6B6560] hover:text-[#1A1814] transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="8" x2="20" y2="8"/><line x1="4" y1="16" x2="20" y2="16"/></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/20" />
          <div
            className="absolute top-16 left-4 right-4 rounded-2xl border border-[#E0DCD5] shadow-lg p-4 flex flex-col gap-1"
            style={{ background: 'rgba(247, 246, 242, 0.98)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { href: `${APP_URL}/request`, label: 'New trip' },
              { href: `${APP_URL}/trip-plans`, label: 'Trip plans' },
              { href: `${APP_URL}/taste-profile`, label: 'Taste profile' },
              { href: `${APP_URL}/how-it-works`, label: 'How it works' },
              { href: `${APP_URL}/pricing`, label: 'Pricing' },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="block px-4 py-2.5 rounded-xl text-sm font-normal text-[#6B6560] hover:text-[#1A1814] hover:bg-[#1A1814]/[0.03] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ──────────────────────────── HERO ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img src={`${SUPABASE_ASSETS}/JOLI_Lockup_White_Clean.svg`} alt="JOLI" className={styles.heroSymbol} />
          <h1 className={styles.heroHeadline}>The travel concierge that learns your taste.</h1>
          <p className={styles.heroSub}>Gets better every trip.</p>
          <a href={`${APP_URL}/request`} className={styles.btnPillGhostWhite}>Plan a trip</a>
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
        </div>
      </section>

      {/* Mobile-only image between testimonials and FAQ */}
      <div className={styles.faqImageMobile}>
        <img src={`${SUPABASE_ASSETS}/Landing1.jpeg`} alt="" className={styles.faqImage} />
      </div>

      {/* ──────────────────── FAQ ──────────────────── */}
      <section className={`${styles.section} ${styles.faqSection} ${styles.revealSection}`} ref={setRef(1)}>
        <div className={styles.faqOuter}>
          <div data-stagger className={`${styles.faqImageCol} ${styles.staggerChild} ${styles.faqImageDesktop}`}>
            <img src={`${SUPABASE_ASSETS}/Landing1.jpeg`} alt="" className={styles.faqImage} />
          </div>
          <div className={styles.faqCol}>
            <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>Frequently asked</span>
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
                Start planning <span className={styles.ctaBannerArrow}>→</span>
              </a>
              <a
                href={`${APP_URL}/taste-profile`}
                className={styles.ctaBannerBtnGhost}
              >
                Set up your taste profile
              </a>
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
                JOLI is a travel copilot for people who care what they&apos;re searching for and how a place feels. Not the highest rated. Not the most reviewed. The right one for you.
              </p>
              <a href="https://app.jolicollective.net/about" className={styles.manifestoCta}>
                Read our story →
              </a>
            </div>
            <div className={styles.manifestoRight}>
              <div className={styles.manifestoStanzaFirst}>
                <span className={styles.manifestoSubLabel}>A true story</span>
                <p className={styles.manifestoPullquote}>
                  The places that had shaped my best trips — the small hotels, the restaurants without websites, the conversations with hosts, the villages that didn&apos;t photograph well but had the best food — were precisely the places the internet was worst at recommending.
                </p>
              </div>
              <div className={`${styles.manifestoStanza} ${styles.manifestoStanzaHideMobile}`}>
                <span className={styles.manifestoSubLabel}>The work</span>
                <p className={styles.manifestoStanzaText}>
                  Taste is a form of currency. The work of curation — the reading, the visiting, the saying no to ninety-nine things — is the art of the edit.
                </p>
              </div>
              <div className={styles.manifestoStanza}>
                <span className={styles.manifestoSubLabel}>What we&apos;re not</span>
                <p className={styles.manifestoStanzaText}>
                  We are not a travel agency. We are not a booking platform. JOLI is an inspiration tool with a backbone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── WHAT PEOPLE SAY ──────────────────── */}
      <section className={`${styles.section} ${styles.testimonials} ${styles.revealSection}`} ref={setRef(2)}>
        <div className={styles.testimonialsInner}>
          <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>What people say</span>
          <div className={styles.quoteRow}>
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
      </section>

      {/* ──────────────────────────── FOOTER ──────────────────────────── */}
      <footer className="relative z-10 w-full bg-[#F7F6F2] border-t border-[#E0DCD5]">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12">
            {/* Wordmark */}
            <div className="col-span-2 md:col-span-1">
              <a href="https://jolicollective.net" className="inline-block">
                <img
                  src={`${SUPABASE_ASSETS}/JOLI_Wordmark_Black.svg`}
                  alt="JOLI"
                  className="h-5 w-auto"
                />
              </a>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-[10px] font-semibold text-[#9A938C] uppercase tracking-widest mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href={`${APP_URL}/how-it-works`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">How it works</a></li>
                <li><a href={`${APP_URL}/pricing`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Pricing</a></li>
                <li><a href={`${APP_URL}/hospitable`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Hospitable</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[10px] font-semibold text-[#9A938C] uppercase tracking-widest mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href={`${APP_URL}/about`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">About</a></li>
                <li><a href="mailto:info@jolicollective.net" className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-[10px] font-semibold text-[#9A938C] uppercase tracking-widest mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href={`${APP_URL}/faq`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">FAQ</a></li>
                <li><a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Trustpilot</a></li>
                <li><a href="https://www.instagram.com/joli.collective/" target="_blank" rel="noopener noreferrer" className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Instagram</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[10px] font-semibold text-[#9A938C] uppercase tracking-widest mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><a href={`${APP_URL}/privacy`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Privacy</a></li>
                <li><a href={`${APP_URL}/terms`} className="text-sm text-[#6B6560] hover:text-[#1A1814] transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div className="pt-8 border-t border-[#E0DCD5] flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <p className="text-xs text-[#9A938C]">&copy; 2026 JOLI Collective</p>
            <p className="text-xs text-[#9A938C] italic">Made with care in London</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
