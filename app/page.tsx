import type { Metadata } from 'next';
import UnderConstruction from './_under-construction';

export const metadata: Metadata = {
  title: 'JOLI',
  description:
    'A travelling showroom for decorative arts.',
  openGraph: {
    title: 'JOLI',
    description:
      'A travelling showroom for decorative arts.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI',
    type: 'website',
    images: [{ url: 'https://jolicollective.net/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary',
    title: 'JOLI',
    description:
      'A travelling showroom for decorative arts.',
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <UnderConstruction />;
}
