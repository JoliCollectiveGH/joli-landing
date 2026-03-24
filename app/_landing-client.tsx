'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const BASE = 'https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public';


export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Force video play on mount (iOS blocks autoplay despite correct attributes)
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

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
            href="https://app.jolicollective.net/discover"
            className={scrolled ? styles.navLinkDark : styles.navLinkLight}
          >
            Discover
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
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay loop muted playsInline
          preload="auto"
          webkit-playsinline="true"
          poster={`${BASE}/Assets/hero_poster.jpg`}
          aria-hidden="true"
        >
          <source src={`${BASE}/Assets/Joli_Texture_06.mp4`} type="video/mp4" />
        </video>
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <img
            src={`${BASE}/Assets/JOLI_Symbol_White.png`}
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

      {/* ── SECTION 2: MANIFESTO ── */}
      <section className={styles.manifestoSection}>
        <div className={styles.manifestoInner}>
          <div className={`${styles.manifestoText} reveal`}>
            <p className={styles.eyebrow}>Our story</p>
            <p>JOLI is a full-service trip planning concierge.</p>
            <p>Tell us where you&apos;re going, who you&apos;re travelling with, and what kind of experience you&apos;re after. Our team will build a complete plan around exactly that — stays, dining, activities, flights, transfers, and every logistical detail in between.</p>
            <p>We don&apos;t use algorithms. Every plan is built by people who know these destinations personally, tailored to your interests and your pace. No endless scrolling. No guesswork. Just a considered plan, delivered to your inbox.</p>
          </div>
          <div className={`${styles.manifestoImageWrap} reveal`}>
            <img
              src={`${BASE}/landingpage/Mask_group6.png`}
              alt=""
              aria-hidden="true"
              className={styles.editorialImage}
            />
          </div>
        </div>
      </section>

      {/* ── EDITORIAL IMAGE STRIP ── */}
      <div className={styles.editorialStrip}>
        <img src={`${BASE}/landingpage/filiz-elaerts-ltrL-fcDGWo-unsplash.jpg`} alt="" aria-hidden="true" className={styles.editorialStripImg} />
        <img src={`${BASE}/landingpage/photo-1640190582299-b8c67cfca2a4.jpg`} alt="" aria-hidden="true" className={styles.editorialStripImg} />
        <img src={`${BASE}/landingpage/stefan-stefancik-1NwEDhtL_QA-unsplash.jpg`} alt="" aria-hidden="true" className={styles.editorialStripImg} />
        <img src={`${BASE}/landingpage/peter-thomas-o3K6o34EnPo-unsplash.jpg`} alt="" aria-hidden="true" className={styles.editorialStripImg} />
      </div>

      {/* ── SECTION 3: HOW IT WORKS ── */}
      <section className={styles.howSection}>
        <div className={styles.howInner}>
          <div className={styles.howLeft}>
            <p className={styles.eyebrow}>The service</p>
            <div className={`${styles.howSteps} reveal-stagger reveal`}>
              <div className={styles.howStep}>
                <span className={styles.howNumber}>01</span>
                <div>
                  <h3 className={styles.howTitle}>Describe the trip you&apos;re imagining</h3>
                  <p className={styles.howDesc}>Tell us about your destination, your pace, and the feeling you&apos;re after. Anywhere in the world.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howNumber}>02</span>
                <div>
                  <h3 className={styles.howTitle}>We curate a bespoke plan</h3>
                  <p className={styles.howDesc}>Our team researches, sources, and builds a trip plan tailored to exactly what you&apos;ve described — stays, dining, activities, logistics.</p>
                </div>
              </div>
              <div className={styles.howStep}>
                <span className={styles.howNumber}>03</span>
                <div>
                  <h3 className={styles.howTitle}>Receive your plan within 24 hours</h3>
                  <p className={styles.howDesc}>A complete, bespoke trip plan delivered to your inbox. Every detail considered, every recommendation earned.</p>
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
              src={`${BASE}/landingpage/Mask_group9.svg`}
              alt=""
              aria-hidden="true"
              className={styles.howImageMain}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE PLATFORM ── */}
      <section className={styles.platformSection}>
        <div className={styles.platformInner}>
          <div className="reveal">
            <p className={styles.eyebrow}>The platform</p>
            <h2 className={styles.platformTitle}>More than a concierge</h2>
            <p className={styles.platformSubtext}>
              Your membership gives you a personal travel profile, curated destination guides,
              and a concierge team that gets to know your taste over time.
            </p>
          </div>

          <div className={`${styles.platformGrid} reveal`}>
            {/* Passport card */}
            <a href="https://app.jolicollective.net/taste-profile" className={styles.platformCard}>
              <div className={styles.platformCardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <h3 className={styles.platformCardTitle}>Your Taste Profile</h3>
              <p className={styles.platformCardDesc}>
                Build your travel taste profile. Save inspiration, track trips,
                and stamp the countries you&apos;ve explored. The more you add,
                the sharper your concierge plans become.
              </p>
              <span className={styles.platformCardLink}>View your taste profile →</span>
            </a>

            {/* Discovery card */}
            <a href="https://app.jolicollective.net/discover" className={styles.platformCard}>
              <div className={styles.platformCardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <h3 className={styles.platformCardTitle}>Travel Inspiration</h3>
              <p className={styles.platformCardDesc}>
                Curated destination guides and editorial collections —
                written from experience, not scraped from the internet.
                Explore places through a lens you can trust.
              </p>
              <span className={styles.platformCardLink}>Start exploring →</span>
            </a>

            {/* Concierge card */}
            <a href="https://app.jolicollective.net/request" className={styles.platformCard}>
              <div className={styles.platformCardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className={styles.platformCardTitle}>Trip Planner</h3>
              <p className={styles.platformCardDesc}>
                Describe the trip you&apos;re imagining. Our team builds a complete,
                bespoke plan — stays, dining, activities, logistics — delivered
                to your inbox within 24 hours.
              </p>
              <span className={styles.platformCardLink}>Plan a trip →</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={styles.footer}>
        <Link href="/" className={styles.footerLogo}>
          <img
            src={`${BASE}/Assets/JOLI_Wordmark_Black.svg`}
            alt="JOLI Collective"
          />
        </Link>
        <div className={styles.footerLinks}>
          <a href="https://app.jolicollective.net/privacy">Privacy</a>
          <span className={styles.footerDot}>·</span>
          <a href="https://app.jolicollective.net/terms">Terms</a>
          <span className={styles.footerDot}>·</span>
          <a href="mailto:info@jolicollective.net">Contact</a>
          <span className={styles.footerDot}>·</span>
          <a href="https://instagram.com/joli.collective" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <p className={styles.footerCopy}>© 2026 JOLI Collective</p>
      </footer>
    </>
  );
}
