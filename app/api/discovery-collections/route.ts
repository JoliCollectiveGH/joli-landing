import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const PROPERTY_SELECT =
  'stay_id, name, location_display, country, cover_image_url, editorial_angle, price_band, vibe_tags, type, description_short, booking_url';

export async function GET() {
  const { data: collections, error } = await supabase
    .from('discovery_collections')
    .select(`
      id,
      title,
      subtitle,
      theme,
      display_order,
      discovery_collection_stays (
        display_order,
        stays (${PROPERTY_SELECT})
      )
    `)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('discovery-collections error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Reshape: flatten stays out of the join table and sort by display_order
  const shaped = (collections ?? []).map((col) => {
    const items = (col.discovery_collection_stays ?? [])
      .sort((a: { display_order: number }, b: { display_order: number }) => a.display_order - b.display_order)
      .map((join: { stays: unknown }) => join.stays)
      .filter(Boolean);

    return {
      id: col.id,
      title: col.title,
      subtitle: col.subtitle,
      theme: col.theme,
      properties: items,
    };
  });

  return NextResponse.json(shaped);
}
