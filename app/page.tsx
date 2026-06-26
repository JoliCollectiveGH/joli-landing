import type { Metadata } from 'next';
import UnderConstruction from './_under-construction';

export const metadata: Metadata = {
  title: 'JOLI',
  description:
    'Joli curates intimate hospitality - launches, private functions, artist-led collaborations. The kind of occasions that stay with you.',
  openGraph: {
    title: 'JOLI',
    description:
      'Joli curates intimate hospitality - launches, private functions, artist-led collaborations. The kind of occasions that stay with you.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JOLI',
    description:
      'Joli curates intimate hospitality - launches, private functions, artist-led collaborations. The kind of occasions that stay with you.',
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <UnderConstruction />;
}
