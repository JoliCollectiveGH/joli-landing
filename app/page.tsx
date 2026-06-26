import type { Metadata } from 'next';
import UnderConstruction from './_under-construction';

export const metadata: Metadata = {
  title: 'JOLI',
  description:
    'Joli curates intimate hospitality at the intersection of art, food, and drink.',
  openGraph: {
    title: 'JOLI',
    description:
      'Joli curates intimate hospitality at the intersection of art, food, and drink.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JOLI',
    description:
      'Joli curates intimate hospitality at the intersection of art, food, and drink.',
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <UnderConstruction />;
}
