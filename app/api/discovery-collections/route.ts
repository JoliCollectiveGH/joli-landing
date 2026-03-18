import { NextResponse } from 'next/server';
import { createAdminClient } from '../_lib/supabase-admin';

const PROPERTY_SELECT =
  'stay_id, name, location_display, country, cover_image_url, editorial_angle, price_band, vibe_tags, type, description_short, booking_url';

type CollectionFilters = {
  country?: string[];
  price_band?: string[];
  type?: string[];
  guest_focus_cs?: string[];
};

type CollectionDef = {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  featured?: boolean;
  filters: CollectionFilters;
  limit?: number;
};

const COLLECTIONS: CollectionDef[] = [
  {
    id: 'family-escapes',
    title: 'Family escapes',
    subtitle: 'Plenty of space, room to roam, and easy on the nerves.',
    theme: 'Families',
    filters: { guest_focus_cs: ['family'] },
    limit: 10,
  },
  {
    id: 'city-stays',
    title: 'City stays',
    subtitle: "Apartments and townhouses in Europe's best cities.",
    theme: 'Cities',
    filters: { type: ['apartment', 'townhouse', 'city apartment'] },
    limit: 10,
  },
  {
    id: 'best-villas',
    title: 'Best villas',
    subtitle: 'Private pools, sun terraces, and room to breathe.',
    theme: 'Villas',
    filters: { type: ['villa'] },
    limit: 10,
  },
  {
    id: 'special-occasions',
    title: 'Special occasions',
    subtitle: 'For proposals, anniversaries, and milestone moments.',
    theme: 'Occasions',
    featured: true,
    filters: { guest_focus_cs: ['romance', 'couples'] },
    limit: 8,
  },
  {
    id: 'something-different',
    title: 'Something different',
    subtitle: 'Treehouses, cave hotels, boats — the unexpected.',
    theme: 'Unique stays',
    featured: true,
    filters: { type: ['treehouse', 'cave', 'boat', 'windmill', 'lighthouse', 'unique'] },
    limit: 8,
  },
  {
    id: 'alpine-escapes',
    title: 'Alpine escapes',
    subtitle: 'Mountain lodges, ski chalets, and high-altitude hideaways.',
    theme: 'Mountains',
    filters: {
      type: ['chalet', 'cabin', 'lodge'],
      country: ['Austria', 'Switzerland', 'France', 'Italy', 'Slovenia'],
    },
    limit: 10,
  },
  {
    id: 'coastal-retreats',
    title: 'Coastal retreats',
    subtitle: 'Wake up to the sea. Stay longer than planned.',
    theme: 'Coast',
    filters: { type: ['coastal', 'beachfront', 'seaside', 'beach house'] },
    limit: 10,
  },
];

export async function GET() {
  const supabase = createAdminClient();

  const results = await Promise.all(
    COLLECTIONS.map(async (col) => {
      let query = supabase
        .from('place_embeddings')
        .select(PROPERTY_SELECT)
        .limit(col.limit ?? 10);

      const { type, country, price_band, guest_focus_cs } = col.filters;

      if (type && type.length > 0) {
        query = query.in('type', type);
      }
      if (country && country.length > 0) {
        query = query.in('country', country);
      }
      if (price_band && price_band.length > 0) {
        query = query.in('price_band', price_band);
      }
      if (guest_focus_cs && guest_focus_cs.length > 0) {
        query = query.overlaps('guest_focus_cs', guest_focus_cs);
      }

      const { data, error } = await query;

      if (error) {
        console.error(`Error fetching collection ${col.id}:`, error.message);
      }

      return {
        id: col.id,
        title: col.title,
        subtitle: col.subtitle,
        theme: col.theme,
        featured: col.featured ?? false,
        properties: data ?? [],
      };
    })
  );

  // Only return collections that have properties
  const nonEmpty = results.filter((c) => c.properties.length > 0);

  return NextResponse.json(nonEmpty);
}
