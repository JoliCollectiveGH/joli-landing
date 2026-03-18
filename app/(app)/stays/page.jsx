'use client';

import { useState, useEffect } from 'react';

function cleanName(name) {
  if (!name) return '';
  // Remove common messy patterns
  let clean = name
    .replace(/^\[.*?\]\s*/, '')                // Remove [TAGS] prefix
    .replace(/\s*-\s*\d+\s*bedroom.*$/i, '')   // Remove "- 3 bedroom in..."
    .replace(/\s*\d+\s*sq\s*ft.*$/i, '')       // Remove "1,700 sq ft..."
    .replace(/\s*\d+\s*sqm?\d*\s*.*$/i, '')    // Remove "120 sqm2..."
    .replace(/\s*\(.*?\)\s*$/, '')             // Remove trailing (parenthetical)
    .trim();
  // Truncate to 35 chars if still long
  if (clean.length > 35) clean = clean.slice(0, 35).replace(/\s+\S*$/, '') + '…';
  return clean || name.slice(0, 35);
}

function PlaceDetail({ place, onClose }) {
  if (!place) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl overflow-y-auto">
        <div className="relative">
          {place.cover_image_url && (
            <div className="h-64 overflow-hidden">
              <img src={place.cover_image_url} alt={place.name} className="w-full h-full object-cover" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <p className="text-xs tracking-widest uppercase text-[#AD531B] font-medium mb-2">{place.location_display}</p>
          <h2 className="text-xl font-light text-[#1A1814] mb-1">{place.name}</h2>
          {place.country && <p className="text-sm text-[#6B6560] mb-3">{place.country}</p>}

          <div className="flex flex-wrap gap-2 mb-4">
            {place.price_band && (
              <span className="text-xs text-[#AD531B] bg-[#AD531B]/10 px-3 py-1 rounded-full">{place.price_band}</span>
            )}
            {place.type && (
              <span className="text-xs text-[#6B6560] bg-[#F7F6F2] px-3 py-1 rounded-full border border-[#E0DCD5]">{place.type}</span>
            )}
          </div>

          {place.description_short && (
            <p className="text-sm text-[#6B6560] leading-relaxed mb-6">{place.description_short}</p>
          )}

          {place.vibe_tags && place.vibe_tags.length > 0 && (
            <div className="mb-6">
              <p className="text-xs text-[#6B6560] uppercase tracking-wider mb-2">Vibe</p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(place.vibe_tags) ? place.vibe_tags : []).map((tag, i) => (
                  <span key={i} className="text-xs text-[#6B6560] bg-[#F7F6F2] px-3 py-1 rounded-full border border-[#E0DCD5]">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {place.booking_url && (
            <a
              href={place.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 rounded-lg text-white text-sm font-medium transition-colors"
              style={{ backgroundColor: '#AD531B' }}
            >
              View property
            </a>
          )}

          <div className="mt-4 pt-4 border-t border-[#E0DCD5]">
            <p className="text-xs text-[#6B6560] text-center">
              Want this in your trip plan?{' '}
              <a href="/request" className="text-[#AD531B] font-medium hover:underline">Plan a trip</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function PlaceCard({ place, onSelect }) {
  return (
    <div
      className="cursor-pointer group flex-shrink-0 w-56"
      onClick={() => onSelect(place)}
    >
      <div className="h-36 rounded-lg overflow-hidden bg-[#E0DCD5] mb-2">
        {place.cover_image_url && (
          <img
            src={place.cover_image_url}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
      </div>
      <p className="text-xs text-[#AD531B] tracking-wider uppercase mb-0.5">{place.location_display}</p>
      <p className="text-sm text-[#1A1814] font-light leading-snug">{cleanName(place.name)}</p>
      {place.price_band && (
        <p className="text-xs text-[#6B6560] mt-0.5">{place.price_band}</p>
      )}
    </div>
  );
}

function CollectionCarousel({ collection, onSelect }) {
  return (
    <section className="mb-10">
      <div className="mb-4 px-4 md:px-8">
        <p className="text-xs text-[#AD531B] tracking-widest uppercase font-medium mb-1">{collection.theme}</p>
        <h2 className="text-xl font-light text-[#1A1814]">{collection.title}</h2>
        {collection.subtitle && (
          <p className="text-sm text-[#6B6560] mt-1">{collection.subtitle}</p>
        )}
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 md:px-8 pb-2 scrollbar-hide">
        {collection.properties.map((place) => (
          <PlaceCard key={place.stay_id} place={place} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function FeaturedCollection({ collection, onSelect }) {
  const hero = collection.properties.length > 1 ? collection.properties[1] : collection.properties[0];
  const rest = collection.properties
    .filter((_, i) => i !== (collection.properties.length > 1 ? 1 : 0))
    .slice(0, 4);

  if (!hero) return null;

  return (
    <section className="mb-12 px-4 md:px-8">
      <div className="mb-4">
        <p className="text-xs text-[#AD531B] tracking-widest uppercase font-medium mb-1">{collection.theme}</p>
        <h2 className="text-xl font-light text-[#1A1814]">{collection.title}</h2>
        {collection.subtitle && (
          <p className="text-sm text-[#6B6560] mt-1">{collection.subtitle}</p>
        )}
      </div>

      {/* Hero */}
      <div
        className="cursor-pointer group relative rounded-xl overflow-hidden mb-4 h-72 bg-[#E0DCD5]"
        onClick={() => onSelect(hero)}
      >
        {hero.cover_image_url && (
          <img
            src={hero.cover_image_url}
            alt={hero.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 p-5">
          <p className="text-xs text-white/80 tracking-wider uppercase mb-1">{hero.location_display}</p>
          <p className="text-lg text-white font-light">{cleanName(hero.name)}</p>
          {hero.price_band && <p className="text-xs text-white/70 mt-0.5">{hero.price_band}</p>}
        </div>
      </div>

      {/* Rest as cards */}
      {rest.length > 0 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {rest.map((place) => (
            <PlaceCard key={place.stay_id} place={place} onSelect={onSelect} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function BrowsePage() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    fetch('/api/discovery-collections')
      .then((r) => r.json())
      .then((data) => {
        setCollections(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-sm text-[#6B6560]">Loading…</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] py-10">
      <div className="mb-8 px-4 md:px-8">
        <h1 className="text-3xl font-light text-[#1A1814]">Browse stays</h1>
        <p className="text-sm text-[#6B6560] mt-1">Handpicked properties across Europe</p>
      </div>

      {collections.map((collection, i) => {
        if (!collection.properties || collection.properties.length === 0) return null;
        // Use FeaturedCollection for the first collection, carousel for the rest
        if (i === 0) {
          return (
            <FeaturedCollection
              key={collection.id}
              collection={collection}
              onSelect={setSelectedPlace}
            />
          );
        }
        return (
          <CollectionCarousel
            key={collection.id}
            collection={collection}
            onSelect={setSelectedPlace}
          />
        );
      })}

      {selectedPlace && (
        <PlaceDetail place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </main>
  );
}
