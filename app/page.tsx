import type { Metadata } from 'next';
import LandingPage from './_landing-client';

export const metadata: Metadata = {
  title: 'JOLI Collective — Trip Planning Concierge',
  description: 'A full-service trip planning concierge. Tell us where you want to go — we deliver a complete, bespoke plan within 24 hours.',
  openGraph: {
    title: 'JOLI Collective — Trip Planning Concierge',
    description: 'A full-service trip planning concierge. Tell us where you want to go — we deliver a complete, bespoke plan within 24 hours.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI Collective',
    type: 'website',
    images: [
      {
        url: 'https://jolicollective.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JOLI Collective — Trip Planning Concierge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOLI Collective — Trip Planning Concierge',
    description: 'A full-service trip planning concierge. Tell us where you want to go — we deliver a complete, bespoke plan within 24 hours.',
    images: ['https://jolicollective.net/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <LandingPage />;
}
