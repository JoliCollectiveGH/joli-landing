'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const BASE = 'https://vzjcbnlsfkpigrdfrifx.supabase.co/storage/v1/object/public';

const SHOWCASE_PROPERTIES = [
  {
    name: "Claridge's",
    location: "Mayfair, London",
    image: "https://media.cntraveller.com/photos/69273c95310b260f170d9d3e/16:9/w_2560%2Cc_limit/Foyer-Reading-Room-Claridges-November2025-PR-Global.jpg",
  },
  {
    name: "Skinopi Lodge",
    location: "Milos, South Aegean",
    image: "https://assets.basehub.com/95f6dbe5/6565883af81e703eaae526b202aef7f5/skinopi-lodge-banner.jpg?width=1920&quality=85&format=auto",
  },
  {
    name: "Villa Sant'Andrea",
    location: "Taormina, Sicily",
    image: "https://img.belmond.com/video/upload/w_1920,ar_16:9,c_fill,g_auto/f_auto,q_auto/v1762273533/videos/VSA/vsa-homepage-loop02.jpg",
  },
  {
    name: "Vipp Chimney House",
    location: "Copenhagen",
    image: "https://media.umbraco.io/vipp-com-2/axnptdfz/asrosenvinge_vipp_chimney_house_copenhagen_3-copy.jpg?width=1920&format=webp",
  },
  {
    name: "Dar Kemgia",
    location: "Marrakech",
    image: "https://cdn.lecollectionist.com/__lecollectionist__/production/houses/7531/photos/eUWpOJ4RSiC8xoxbBUC9_77afdd9b-cb39-4a3c-f3e5-38583aedf562.jpg?width=1152&force_format=webp&q=50",
  },
  {
    name: "Villa Keisa",
    location: "Algarve",
    image: "https://cdn.lecollectionist.com/__collectionist__/production/uploads/photos/house-3078/2019-04-15-9046a894304d0a0177c4897c8376f842.jpg?width=1152&force_format=webp&q=50",
  },
  {
    name: "Heckfield Place",
    location: "Hampshire, England",
    image: "https://assets.basehub.com/95f6dbe5/aa6330a95e7b60d29759db5a87321d78/heckfield-place-banner.jpg?width=1920&quality=85&format=auto",
  },
  {
    name: "Almhof Schneider",
    location: "Lech, Vorarlberg",
    image: "https://assets.basehub.com/95f6dbe5/d7de442737633f9c9de1348292b92b76/copy-of-almhofschneiderrestaurant2016-(c)-klaus-vyhnalek.jpg?width=1920&quality=85&format=auto",
  },
  {
    name: "Casa Ariola",
    location: "Bonifacio, Corsica",
    image: "https://cdn.lecollectionist.com/__lecollectionist__/production/houses/8661/photos/BgteAaLSgG3JvzwKVsww_913cd770-c4a6-4a88-a4b4-0325f9068e4a.jpg?width=1152&force_format=webp&q=50",
  },
  {
    name: "Villa Medicea",
    location: "Florence, Tuscany",
    image: "https://cdn.lecollectionist.com/__lecollectionist__/production/houses/5146/photos/enFQnSiTSe3lbPVKEIRw_3a053bec-65a6-4ad3-bedb-091ca5541724.jpg?width=2880&force_format=webp&q=50",
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
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
            href="https://app.jolicollective.net/stays"
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

      {/* ── SECTION 2: MANIFESTO ── */}
      <section className={styles.manifestoSection}>
        <div className={styles.manifestoInner}>
          <div className={`${styles.manifestoText} reveal`}>
            <p className={styles.eyebrow}>Our story</p>
            <p>
              We started JOLI because we were tired of searching.
            </p>
            <p>
              Tired of scrolling through thousands of identical listings. Tired of algorithms that don&apos;t
              understand the difference between a boutique hotel and a lodging.
            </p>
            <p>
              JOLI is a concierge for people who care about where they stay. Tell us what you&apos;re looking
              for — the place, the pace, the feeling — and we&apos;ll come back with a plan built around exactly that.
            </p>
            <p>
              2,000 handpicked stays across Europe. Curated trip plans worldwide. Every recommendation earned,
              not sponsored.
            </p>
          </div>
          <div className={`${styles.manifestoImageWrap} reveal`}>
            <img
              src={`${BASE}/landingpage/Mask_group5.svg`}
              alt=""
              aria-hidden="true"
              className={styles.editorialImage}
            />
          </div>
        </div>
      </section>

      {/* ── EDITORIAL IMAGE STRIP ── */}
      <div className={styles.editorialStrip}>
        <img src={`${BASE}/landingpage/editorial_1.svg`} alt="" aria-hidden="true" className={styles.editorialStripImg} />
        <img src={`${BASE}/landingpage/editorial_2.svg`} alt="" aria-hidden="true" className={styles.editorialStripImg} />
        <img src={`${BASE}/landingpage/Mask_group3.svg`} alt="" aria-hidden="true" className={styles.editorialStripImg} />
        <img src={`${BASE}/landingpage/Mask_group.svg`} alt="" aria-hidden="true" className={styles.editorialStripImg} />
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
              src={`${BASE}/landingpage/Mask_group9.svg`}
              alt=""
              aria-hidden="true"
              className={styles.howImageMain}
            />
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE COLLECTION ── */}
      <section className={styles.collectionSection} id="collection">
        <div className={styles.collectionHeader}>
          <div className={styles.collectionHeaderRow}>
            <div className="reveal">
              <p className={styles.eyebrow}>The collection</p>
              <h2 className={styles.collectionTitle}>2,000+ handpicked stays across Europe</h2>
              <p className={styles.collectionSubtext}>Every property chosen for character, design, and editorial merit.</p>
            </div>
            <div className={styles.collectionHeaderCta}>
              <a href="https://app.jolicollective.net/stays" className={`${styles.btn} ${styles.btnGhost}`}>
                Browse the collection
              </a>
            </div>
          </div>
        </div>
        <div className={`${styles.collectionScroll} reveal`} ref={showcaseRef}>
          {SHOWCASE_PROPERTIES.slice(0, 5).map((prop) => (
            <div key={prop.name} className={styles.collectionCard}>
              <img src={prop.image} alt={prop.name} className={styles.collectionCardImage} />
              <div className={styles.collectionCardMeta}>
                <p className={styles.collectionCardName}>{prop.name}</p>
                <p className={styles.collectionCardLocation}>{prop.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.collectionScroll} ${styles.collectionScrollRow2} reveal`}>
          {SHOWCASE_PROPERTIES.slice(5, 10).map((prop) => (
            <div key={prop.name} className={styles.collectionCard}>
              <img src={prop.image} alt={prop.name} className={styles.collectionCardImage} />
              <div className={styles.collectionCardMeta}>
                <p className={styles.collectionCardName}>{prop.name}</p>
                <p className={styles.collectionCardLocation}>{prop.location}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.collectionCtaMobile}>
          <a href="https://app.jolicollective.net/stays" className={`${styles.btn} ${styles.btnGhost}`}>
            Browse the collection
          </a>
        </div>
      </section>

      {/* ── SIGN-OFF: QUOTE + EDITORIAL ── */}
      <section className={styles.quoteEditorialSection}>
        <div className={styles.quoteEditorialInner}>
          <div className={`${styles.quoteEditorialLeft} reveal`}>
            <img
              src={`${BASE}/landingpage/Mask_group8.svg`}
              alt=""
              aria-hidden="true"
              className={styles.quoteEditorialDining}
            />
          </div>
          <div className={`${styles.quoteEditorialRight} reveal`}>
            <blockquote className={styles.quoteText}>
              &ldquo;In an age of speed, I began to think nothing could be more exhilarating than going slow.
              In an age of distraction, nothing can feel more luxurious than paying attention.
              And in an age of constant movement, nothing is more urgent than sitting still.&rdquo;
            </blockquote>
            <p className={styles.quoteAttribution}>Pico Iyer</p>
            <img
              src={`${BASE}/Assets/JOLI_Symbol_Black.svg`}
              alt=""
              aria-hidden="true"
              className={styles.quoteMark}
            />
            <img
              src={`${BASE}/landingpage/Mask_group10.svg`}
              alt=""
              aria-hidden="true"
              className={styles.quotePortrait}
            />
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
        </div>
        <p className={styles.footerCopy}>© 2026 JOLI Collective</p>
      </footer>
    </>
  );
}
