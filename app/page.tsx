import type { Metadata } from 'next';
import LandingPage from './_landing-client';

export const metadata: Metadata = {
  title: 'MILO — Your AI Travel Copilot',
  description: 'MILO is your AI travel copilot. A handpicked collection of design-led stays across Europe, found through conversation.',
  openGraph: {
    title: 'MILO — Your AI Travel Copilot',
    description: 'MILO is your AI travel copilot. A handpicked collection of design-led stays across Europe, found through conversation.',
    url: 'https://meetmilo.org',
    siteName: 'MILO by JOLI Collective',
    type: 'website',
  },
  alternates: {
    canonical: 'https://meetmilo.org',
  },
};

export default function Home() {
  return <LandingPage />;
}
