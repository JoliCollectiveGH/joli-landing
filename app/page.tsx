import type { Metadata } from 'next';
import UnderConstruction from './_under-construction';

export const metadata: Metadata = {
  title: 'JOLI',
  description:
    'Joli curates intimate hospitality - launches, private functions, artist-led collaborations. The kind of occasions that stay with you.',
  openGraph: {
    title: 'JOLI',
    description:
      'Joli curates intimate hospitality. The kind of occasions that stay with you.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI',
    type: 'website',
    images: [{ url: 'https://jolicollective.net/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary',
    title: 'JOLI',
    description:
      'Joli curates intimate hospitality. The kind of occasions that stay with you.',
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <UnderConstruction />;
}
