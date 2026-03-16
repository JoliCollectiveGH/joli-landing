'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const BASE = 'https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public';

const PROPERTY_CARDS = [
  { src: `${BASE}/landingpage/Mask%20group.svg`,  alt: 'Handpicked stay 1' },
  { src: `${BASE}/landingpage/Mask%20group2.svg`, alt: 'Handpicked stay 2' },
  { src: `${BASE}/landingpage/Mask%20group3.svg`, alt: 'Handpicked stay 3' },
  { src: `${BASE}/landingpage/Mask%20group4.svg`, alt: 'Handpicked stay 4' },
  { src: `${BASE}/landingpage/Mask%20group5.svg`, alt: 'Handpicked stay 5' },
  { src: `${BASE}/landingpage/Mask%20group6.svg`, alt: 'Handpicked stay 6' },
  { src: `${BASE}/landingpage/Mask%20group7.svg`, alt: 'Handpicked stay 7' },
  { src: `${BASE}/landingpage/Mask%20group8.svg`, alt: 'Handpicked stay 8' },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  // Nav transparency on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Drag-to-scroll on collection strip
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

  return (
    <>
      {/* ── NAVIGATION ── */}
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : styles.navTransparent}`}>
        <Link href="/" className={styles.navLogo}>
          <img
            src={`${BASE}/Assets/JOLI_Wordmark_Black.svg`}
            alt="JOLI Collective"
            className={scrolled ? '' : styles.navLogoInverted}
          />
        </Link>
        <div className={styles.navLinks}>
          <a
            href="#collection"
            className={scrolled ? styles.navLinkDark : styles.navLinkLight}
          >
            The collection
          </a>
          <a
            href="https://app.jolicollective.net/request"
            className={`${styles.navCta} ${scrolled ? styles.navCtaDark : styles.navCtaLight}`}
          >
            Plan a trip
          </a>
        </div>
      </nav>

      {/* ── SECTION 1: HERO ── */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          src={`${BASE}/Assets/Joli_Texture_06.mp4`}
          autoPlay loop muted playsInline
          aria-hidden="true"
        />
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <img
            src={`${BASE}/Assets/JOLI_Symbol_White.svg`}
            alt=""
            aria-hidden="true"
            className={styles.heroSymbol}
          />
          <p className={styles.heroLabel}>JOLI COLLECTIVE</p>
        </div>
        <div className={styles.scrollArrow} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 2: QUOTE ── */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteOverlay} />
        <div className={styles.quoteContent}>
          <div className={`${styles.quoteProse} reveal`}>
            <blockquote className={styles.quoteText}>
              &ldquo;In an age of speed, I began to think nothing could be more exhilarating than going slow.
              In an age of distraction, nothing can feel more luxurious than paying attention.
              And in an age of constant movement, nothing is more urgent than sitting still.&rdquo;
            </blockquote>
            <p className={styles.quoteAttribution}>Pico Iyer</p>
          </div>
        </div>
        <img
          src={`${BASE}/Assets/JOLI_Symbol_White.svg`}
          alt=""
          aria-hidden="true"
          className={styles.quoteMark}
        />
      </section>

      {/* ── SECTION 3: MANIFESTO ── */}
      <section className={styles.manifestoSection}>
        <div className={styles.manifestoContent}>
          <p className={`${styles.manifestoText} reveal`}>
            Like a snail carrying home within its shell, we move through new terrain.<br /><br />
            An inward journey for belonging through presence rather than accumulation.<br /><br />
            At JOLI we seek these experiences that are intentional, rooted, and open.<br /><br />
            The type of journeys that foster profound connection with ourselves, and others.<br /><br />
            Travel for people who understand that the most radical act might be slowing down.
          </p>
        </div>
        <img
          src={`${BASE}/Assets/JOLI_Symbol_White.svg`}
          alt=""
          aria-hidden="true"
          className={styles.manifestoMark}
        />
      </section>

      {/* ── SECTION 4: HOW IT WORKS ── */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <div className={styles.howLeft}>
            <p className={styles.eyebrow}>The service</p>
            <div className={`${styles.howSteps} reveal-stagger reveal`}>
              <div className={styles.howStep}>
                <span className={styles.howNumber}>01</span>
                <div>
                  <h3 className={styles.howTitle}>Describe the trip you&apos;re imagining</h3>
                  <p className={styles.howDesc}>Tell MILO — our concierge — about your destination, your pace, and the feeling you&apos;re after. Anywhere in the world.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howNumber}>02</span>
                <div>
                  <h3 className={styles.howTitle}>We curate a bespoke plan</h3>
                  <p className={styles.howDesc}>Our team researches, sources, and assembles a trip plan tailored to exactly what you&apos;ve described. Stays, dining, activities, logistics.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howNumber}>03</span>
                <div>
                  <h3 className={styles.howTitle}>Travel with everything considered</h3>
                  <p className={styles.howDesc}>Receive your plan within 48 hours. Every detail researched, every recommendation earned.</p>
                </div>
              </div>
            </div>
            <div>
              <a href="https://app.jolicollective.net/request" className={`${styles.btn} ${styles.btnPrimary}`}>
                Plan a trip
              </a>
            </div>
          </div>
          <div className={`${styles.howRight} reveal`}>
            <img
              src={`${BASE}/landingpage/clemenspoloczek_1684240265_3103954777297115262_1090656_1.svg`}
              alt="Editorial travel photography"
              className={styles.howImage}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 5: THE COLLECTION ── */}
      <section className={styles.collectionSection} id="collection">
        <div className={styles.collectionHeader}>
          <div className="reveal">
            <p className={styles.eyebrow}>The collection</p>
            <h2 className={styles.collectionTitle}>2,000+ handpicked stays across Europe</h2>
            <p className={styles.collectionSubtext}>Every property chosen for character, design, and editorial merit. Not star ratings.</p>
          </div>
        </div>
        <div className={`${styles.collectionScroll} reveal`} ref={showcaseRef}>
          {PROPERTY_CARDS.map((card, i) => (
            <div key={i} className={styles.collectionCard}>
              <img src={card.src} alt={card.alt} className={styles.collectionCardImage} />
            </div>
          ))}
        </div>
        <div className={`${styles.collectionCta} reveal`}>
          <a href="https://app.jolicollective.net/stays" className={`${styles.btn} ${styles.btnGhost}`}>
            Browse the collection
          </a>
        </div>
      </section>

      {/* ── SECTION 6: WORLDWIDE ── */}
      <section className={styles.worldwideSection}>
        <div className={styles.worldwideOverlay} />
        <div className={`${styles.worldwideInner} reveal`}>
          <h2 className={styles.worldwideTitle}>The collection is European. The service is global.</h2>
          <p className={styles.worldwideSubtext}>Tell us where you want to go — anywhere in the world — and we&apos;ll build the plan.</p>
          <a href="https://app.jolicollective.net/request" className={`${styles.btn} ${styles.btnWhite}`}>
            Plan a trip
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <Link href="/" className={styles.footerLogo}>
          <img
            src={`${BASE}/Assets/JOLI_Lockup_Black.svg`}
            alt="JOLI Collective"
          />
        </Link>
        <div className={styles.footerLinks}>
          <Link href="/privacy">Privacy</Link>
          <span className={styles.footerDot}>·</span>
          <Link href="/terms">Terms</Link>
          <span className={styles.footerDot}>·</span>
          <a href="mailto:info@jolicollective.net">Contact</a>
        </div>
        <p className={styles.footerCopy}>© 2026 JOLI Collective</p>
      </footer>
    </>
  );
}
