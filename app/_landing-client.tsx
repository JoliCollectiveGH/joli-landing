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
  {
    quote:
      'It\u2019s like being taken by the hand by someone who really understands you.',
    name: 'Ali, Galicia',
  },
];


export default function LandingClient() {
  const [menuOpen, setMenuOpen] = useState(false);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  const toggleMenu = useCallback(() => {
    setMenuOpen(o => !o);
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
              {/* Primary nav items */}
              <nav className={styles.mobileMenuPrimary}>
                <a
                  href={`${APP_URL}/how-it-works`}
                  className={styles.mobileMenuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  How it works
                </a>
                <a
                  href={`${APP_URL}/pricing`}
                  className={styles.mobileMenuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href={`${APP_URL}/about`}
                  className={styles.mobileMenuLink}
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </a>
              </nav>

              {/* Footer section inside menu */}
              <div className={styles.mobileMenuFooter}>
                <div className={styles.mobileMenuFooterCols}>
                  <div className={styles.mobileMenuFooterCol}>
                    <h4 className={styles.mobileMenuFooterHeading}>Product</h4>
                    <a href={`${APP_URL}/how-it-works`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>How it works</a>
                    <a href={`${APP_URL}/pricing`} className={styles.mobileMenuFooterLink} onClick={() => setMenuOpen(false)}>Pricing</a>
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
              The travel copilot that learns what you&apos;d choose.
            </h1>
            <p className={styles.heroSub}>
              Plans that get sharper the more you travel.
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
              <span className={styles.trustStars}>★★★★★</span>
              <span className={styles.trustText}>5.0 on Trustpilot</span>
            </a>
          </div>

          <div className={styles.heroRight}>
            <PhoneMockup />
          </div>
        </div>
      </section>

      <section className={styles.mobilePhoneSection}>
        <div className={styles.mobilePhoneInner}>
          <PhoneMockup />
          <p className={styles.mobilePhoneCaption}>How a conversation begins</p>
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
                'Stays matched to how you like to feel, not just where you want to go.',
                'Dining picked for your palate, not the highest rating.',
                'Experiences filtered for your pace, your interests, your trip.',
              ].map((item, i) => (
                <div key={i} className={styles.tasteBenefit}>
                  <span className={styles.tasteDash}>—</span>
                  <p className={styles.tasteBenefitText}>{item}</p>
                </div>
              ))}
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
              <span className={styles.trustpilotStars}>★★★★★</span>
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
                New trip <span className={styles.ctaBannerArrow}>→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────── FOOTER ──────────────────────────── */}
      <footer className="relative z-10 w-full bg-white border-t border-[#E0DCD5]">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 mb-12">
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
