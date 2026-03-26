import type { Metadata } from 'next';
import LandingPage from './_landing-client';

export const metadata: Metadata = {
  title: 'JOLI Collective — Plan your trip',
  description: 'Handpicked stays, dining, and experiences, wherever you\'re going.',
  openGraph: {
    title: 'JOLI Collective — Plan your trip',
    description: 'Handpicked stays, dining, and experiences, wherever you\'re going.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI Collective',
    type: 'website',
    images: [
      {
        url: 'https://jolicollective.net/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JOLI Collective — Plan your trip',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JOLI Collective — Plan your trip',
    description: 'Handpicked stays, dining, and experiences, wherever you\'re going.',
    images: ['https://jolicollective.net/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <LandingPage />;
}
