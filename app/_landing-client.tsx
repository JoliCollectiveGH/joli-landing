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
          <div className={`${styles.navCapsule} ${scrolled ? styles.navCapsuleScrolled : styles.navCapsuleHero}`}>
            <a href="https://jolicollective.net" className={styles.navLogo}>
              <img
                src={`${SUPABASE_ASSETS}/JOLI_Lockup_White_Clean.svg`}
                alt="JOLI"
                className={styles.navLogoImg}
                style={scrolled ? { filter: 'invert(1) brightness(0)' } : undefined}
              />
            </a>
            <div className={styles.navDivider} />
            <a href={`${APP_URL}/how-it-works`} className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : styles.navLinkHero}`}>How it works</a>
            <a href={`${APP_URL}/membership`} className={`${styles.navLink} ${scrolled ? styles.navLinkScrolled : styles.navLinkHero}`}>Pricing</a>
            <a href={`${APP_URL}/request`} className={`${styles.navCta} ${scrolled ? styles.navCtaScrolled : styles.navCtaHero}`}>Plan a trip</a>
          </div>
        </div>
      </nav>

      {/* ──────────────────────────── HERO ──────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <img src={`${SUPABASE_ASSETS}/JOLI_Lockup_White_Clean.svg`} alt="JOLI" className={styles.heroSymbol} />
          <h1 className={styles.heroHeadline}>Your personal travel concierge</h1>
          <p className={styles.heroSub}>Where to stay. Where to eat. What&rsquo;s worth your time.</p>
          <a href={`${APP_URL}/request`} className={styles.btnPillGhostWhite}>Plan a trip</a>
        </div>
      </section>

      {/* ──────────────────── HOW IT WORKS ──────────────────── */}
      <section className={`${styles.cardFirst} ${styles.howSection} ${styles.revealSection}`} ref={setRef(0)}>
        <div className={styles.howInner}>
          <div className={styles.sectionHeader}>
            <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>How it works</span>
            <h2 data-stagger className={`${styles.sectionHeadline} ${styles.staggerChild}`}>A complete trip plan in minutes.</h2>
          </div>
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

      {/* ──────────────────── PRODUCT DEMO ──────────────────── */}
      <section className={`${styles.section} ${styles.demoSection} ${styles.revealSection}`} ref={setRef(1)}>
        <div className={styles.demoInner}>
          <div className={styles.sectionHeader}>
            <span data-stagger className={`${styles.eyebrow} ${styles.staggerChild}`}>See it in action</span>
            <h2 data-stagger className={`${styles.sectionHeadline} ${styles.staggerChild}`}>Built to feel like a conversation.</h2>
          </div>

          {/* Demo 1 — The intake chat */}
          <div className={styles.demoBlock}>
            <p className={styles.demoBlockLabel}>The intake chat</p>
            <div className={styles.demoPanelDark}>
              <div className={styles.demoChatHeader}>
                <img src={`${SUPABASE_ASSETS}/JOLI_Symbol_White_Clean.svg`} alt="" className={styles.demoChatLogo} />
                <span className={styles.demoChatLabel}>JOLI</span>
              </div>
              <div className={styles.demoChatMessages}>
                {[
                  { role: 'joli', text: "Hi — I'm here to help plan your trip. Where are you thinking of going?" },
                  { role: 'user', text: 'South Africa — Cape Town and maybe a safari' },
                  { role: 'joli', text: "Great combination. Most people do 4–5 nights in Cape Town then head to a private reserve. When are you thinking of travelling?" },
                  { role: 'user', text: 'Late September, about 10 days' },
                  { role: 'joli', text: "Good timing — late September is dry season in the bush, ideal for game viewing. Who's travelling?" },
                  { role: 'user', text: "Just the two of us — we just want it to feel special" },
                ].map((msg, i) => (
                  msg.role === 'joli' ? (
                    <div key={i} className={styles.demoChatJoli}>
                      <span className={styles.demoChatSender}>JOLI</span>
                      <div className={styles.demoChatBubbleJoli}>{msg.text}</div>
                    </div>
                  ) : (
                    <div key={i} className={styles.demoChatUser}>
                      <div className={styles.demoChatBubbleUser}>{msg.text}</div>
                    </div>
                  )
                ))}
              </div>
              <div className={styles.demoChatFade} />
            </div>
          </div>

          <div className={styles.demoPairGrid}>
          {/* Demo 2 — The copilot */}
          <div className={styles.demoBlock}>
            <p className={styles.demoBlockLabel}>The copilot</p>
            <div className={styles.demoPanelLight}>
              <div className={styles.demoCopilotPickerMobile}>
                <p className={styles.demoCopilotPickerPrompt}>What would you like to work on?</p>
                {[
                  { label: "Where you'll stay", sub: 'Find alternatives, compare options, update details' },
                  { label: 'Where to eat', sub: 'Find restaurants, check reviews, add or swap' },
                  { label: 'Things to do', sub: 'Discover activities, day trips, experiences' },
                ].map(s => (
                  <div key={s.label} className={styles.demoCopilotPickerCardStatic}>
                    <span className={styles.demoCopilotPickerLabel}>{s.label}</span>
                    <span className={styles.demoCopilotPickerSub}>{s.sub}</span>
                  </div>
                ))}
              </div>
              <div className={styles.demoCopilotExchange}>
                <div className={styles.demoCopilotDivider} />
                <div className={styles.demoCopilotMsgUser}>Can we swap the hotel for somewhere quieter?</div>
                <div className={styles.demoCopilotMsgJoli}>
                  <span className={styles.demoCopilotMsgSender}>JOLI</span>
                  Foresteria Monforte — a restored palazzo in a residential pocket, ten minutes from Tortona on foot. Want me to update the plan?
                </div>
              </div>
            </div>
          </div>

          {/* Demo 3 — Budget tracker */}
          <div className={styles.demoBlock}>
            <p className={styles.demoBlockLabel}>Budget tracker</p>
            <div className={styles.demoPanelLight}>
              <div className={styles.demoBudgetWrap}>
                <p className={styles.demoBudgetNote}>South Africa — 10 nights, 2 travellers</p>
                <div className={styles.demoBudgetRows}>
                  {[
                    { label: 'Accommodation', estimate: 'Est. £2,800–3,400', spent: 2950, low: 2800, high: 3400 },
                    { label: 'Food & drink', estimate: 'Est. £480–620', spent: 310, low: 480, high: 620 },
                    { label: 'Transport', estimate: 'Est. £900–1,200', spent: 820, low: 900, high: 1200 },
                  ].map((cat) => {
                    const max = cat.high * 1.1;
                    const pct = Math.min((cat.spent / max) * 100, 100);
                    const color = cat.spent === 0 ? '#E0DCD5' : cat.spent <= cat.low ? '#7A8B5E' : cat.spent <= cat.high ? '#B8860B' : '#C0392B';
                    return (
                      <div key={cat.label} className={styles.demoBudgetRow}>
                        <div className={styles.demoBudgetRowTop}>
                          <span className={styles.demoBudgetLabel}>{cat.label}</span>
                          <span className={styles.demoBudgetEstimate}>{cat.estimate}</span>
                        </div>
                        <div className={styles.demoBudgetRowMid}>
                          <span className={styles.demoBudgetSpent}>{cat.spent > 0 ? `£${cat.spent.toLocaleString()}` : '£0'}</span>
                          {cat.spent > 0 && cat.spent <= cat.low && <span className={styles.demoBudgetStatus} style={{ color: '#7A8B5E' }}>Under budget</span>}
                          {cat.spent > cat.low && cat.spent <= cat.high && <span className={styles.demoBudgetStatus} style={{ color: '#B8860B' }}>On track</span>}
                        </div>
                        <div className={styles.demoBudgetBar}>
                          <div className={styles.demoBudgetBarFill} style={{ width: `${pct}%`, backgroundColor: color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.demoBudgetTotal}>
                  <div className={styles.demoBudgetRowTop}>
                    <span className={styles.demoBudgetLabel}>Total spent</span>
                    <span className={styles.demoBudgetEstimate}>Budget: £4,500–5,720</span>
                  </div>
                  <div className={styles.demoBudgetSpentLarge}>£3,260</div>
                  <div className={styles.demoBudgetBar}>
                    <div className={styles.demoBudgetBarFill} style={{ width: '57%', backgroundColor: '#7A8B5E' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* ──────────────────── WHAT PEOPLE SAY ──────────────────── */}
      <section className={`${styles.section} ${styles.testimonials} ${styles.revealSection}`} ref={setRef(2)}>
        <div className={styles.testimonialsInner}>
          <span data-stagger className={`${styles.eyebrow} ${styles.eyebrowCentre} ${styles.staggerChild}`}>What people say</span>
          <div className={styles.quoteRow}>
            {TESTIMONIALS.map((t) => (
              <blockquote key={t.name} data-stagger className={`${styles.quote} ${styles.staggerChild}`}>
                <p className={styles.quoteText}>&ldquo;{t.quote}&rdquo;</p>
                <cite className={styles.quoteCite}>— {t.name}</cite>
              </blockquote>
            ))}
          </div>
          <div data-stagger className={`${styles.trustpilot} ${styles.staggerChild}`} style={{ textAlign: 'center' }}>
            <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className={styles.trustpilotLink}>
              <span className={styles.trustpilotStars}>★★★★</span>
              <span className={styles.trustpilotText}>Rated 4/5 on Trustpilot</span>
            </a>
          </div>
        </div>
      </section>

      {/* Mobile-only image between testimonials and FAQ */}
      <div className={styles.faqImageMobile}>
        <img src={`${SUPABASE_ASSETS}/Landing1.jpeg`} alt="" className={styles.faqImage} />
      </div>

      {/* ──────────────────── FAQ ──────────────────── */}
      <section className={`${styles.section} ${styles.faqSection} ${styles.revealSection}`} ref={setRef(3)}>
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
          <a href={`${APP_URL}/request`} className={styles.ctaBanner}>
            <div className={styles.ctaBannerLeft}>
              <p className={styles.ctaBannerEyebrow}>JOLI COLLECTIVE</p>
              <h3 className={styles.ctaBannerHeadline}>Your next trip is one<br /> conversation away.</h3>
            </div>
            <div className={styles.ctaBannerBtns}>
              <span className={styles.ctaBannerBtn}>
                Start planning <span className={styles.ctaBannerArrow}>→</span>
              </span>
              <a
                href={`${APP_URL}/taste-profile`}
                className={styles.ctaBannerBtnGhost}
                onClick={e => e.stopPropagation()}
              >
                Set up your taste profile
              </a>
            </div>
          </a>
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
