import type { Metadata } from 'next';
import UnderConstruction from './_under-construction';

export const metadata: Metadata = {
  title: 'JOLI Collective',
  description: 'Something new is on the way.',
  openGraph: {
    title: 'JOLI Collective',
    description: 'Something new is on the way.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI Collective',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JOLI Collective',
    description: 'Something new is on the way.',
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <UnderConstruction />;
}
