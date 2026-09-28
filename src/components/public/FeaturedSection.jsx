import React from 'react';
import { Sparkles } from 'lucide-react';
import SongCard from './SongCard';

export default function FeaturedSection({ featuredSongs, allSongs }) {
  if (!featuredSongs || featuredSongs.length === 0) return null;

  return (
    <section className="az-featured-section" aria-label="Pilihan Azwatan" style={{ marginBottom: '44px' }}>
      <div className="az-section-header">
        <div className="az-section-title-wrap">
          <span className="az-section-badge">Rekomendasi Kurator</span>
          <h2 className="az-section-title">Pilihan Azwatan</h2>
        </div>
        <span className="az-section-count">{featuredSongs.length} Nasyid Terpilih</span>
      </div>

      <div className="az-song-grid">
        {featuredSongs.map((song) => (
          <SongCard key={`featured-${song.id}`} song={song} currentQueue={allSongs} />
        ))}
      </div>
    </section>
  );
}
