import type { Metadata } from 'next';
import UnderConstruction from './_under-construction';

export const metadata: Metadata = {
  title: 'JOLI',
  description:
    "JOLI makes occasions. Bringing people together in a space that can't simply be booked.",
  openGraph: {
    title: 'JOLI',
    description:
      "JOLI makes occasions. Bringing people together in a space that can't simply be booked.",
    url: 'https://jolicollective.net',
    siteName: 'JOLI',
    type: 'website',
    images: [{ url: 'https://jolicollective.net/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary',
    title: 'JOLI',
    description:
      "JOLI makes occasions. Bringing people together in a space that can't simply be booked.",
  },
  alternates: {
    canonical: 'https://jolicollective.net',
  },
};

export default function Home() {
  return <UnderConstruction />;
}
