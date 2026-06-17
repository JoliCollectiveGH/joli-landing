import type { Metadata } from 'next';
import UnderConstruction from './_under-construction';

export const metadata: Metadata = {
  title: 'JOLI Collective',
  description:
    'A social club staging brand experiences in cultural spaces. Join the waiting list for access.',
  openGraph: {
    title: 'JOLI Collective',
    description:
      'A social club staging brand experiences in cultural spaces. Join the waiting list for access.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI Collective',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JOLI Collective',
    description:
      'A social club staging brand experiences in cultural spaces. Join the waiting list for access.',
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <UnderConstruction />;
}
