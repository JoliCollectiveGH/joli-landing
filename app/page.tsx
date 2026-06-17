import type { Metadata } from 'next';
import UnderConstruction from './_under-construction';

export const metadata: Metadata = {
  title: 'JOLI Collective',
  description:
    'Welcome to JOLI Collective. Join the waiting list for access.',
  openGraph: {
    title: 'JOLI Collective',
    description:
      'Welcome to JOLI Collective. Join the waiting list for access.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI Collective',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JOLI Collective',
    description:
      'Welcome to JOLI Collective. Join the waiting list for access.',
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <UnderConstruction />;
}
