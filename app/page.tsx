import type { Metadata } from 'next';
import UnderConstruction from './_under-construction';

export const metadata: Metadata = {
  title: 'JOLI Collective',
  description:
    'A social club curating intimate hospitality at the intersection of art, food, and drink. Launching July 2026.',
  openGraph: {
    title: 'JOLI Collective',
    description:
      'A social club curating intimate hospitality at the intersection of art, food, and drink. Launching July 2026.',
    url: 'https://jolicollective.net',
    siteName: 'JOLI Collective',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JOLI Collective',
    description:
      'A social club curating intimate hospitality at the intersection of art, food, and drink. Launching July 2026.',
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <UnderConstruction />;
}
