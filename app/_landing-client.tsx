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
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      video.load();
      video.play().catch(() => {});
    }
  }, []);

  // Nav transparency on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
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
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <video
          ref={videoRef}
          className={styles.heroVideo}
          autoPlay loop muted playsInline
          playsinline
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          poster={`${BASE}/Assets/hero_poster.jpg`}
          aria-hidden="true"
        >
          <source src={`${BASE}/Assets/Joli_Texture_06.mp4`} type="video/mp4" />
        </video>
        <div className={styles.heroScrim} />
        <div className={styles.heroContent}>
          <div className={styles.heroCtas}>
            <a
              href="https://app.jolicollective.net/guides"
              className={styles.navLinkLight}
            >
              Discover
            </a>
            <a
              href="https://app.jolicollective.net/request"
              className={`${styles.navCta} ${styles.navCtaLight}`}
            >
              Plan a trip
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
