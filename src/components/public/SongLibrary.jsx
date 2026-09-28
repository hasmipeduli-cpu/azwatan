import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';
import SongCard from './SongCard';
import SkeletonCard from './SkeletonCard';

export default function SongLibrary({
  songs,
  isLoading,
  searchQuery,
  selectedLanguage,
  selectedType,
  onResetFilters,
}) {
  const isFiltered = searchQuery || selectedLanguage !== 'Semua' || selectedType !== 'Semua';

  return (
    <section className="az-library-section" aria-label="Koleksi Nasyid">
      <div className="az-section-header">
        <div className="az-section-title-wrap">
          <span className="az-section-badge">Perpustakaan Audio</span>
          <h2 className="az-section-title">
            {isFiltered ? 'Hasil Pencarian & Filter' : 'Semua Nasyid'}
          </h2>
        </div>
        {!isLoading && (
          <span className="az-section-count">
            {songs.length} {songs.length === 1 ? 'Lagu' : 'Lagu'}
          </span>
        )}
      </div>

      {/* Loading Skeleton State (PRD #22) */}
      {isLoading ? (
        <div className="az-song-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : songs.length === 0 ? (
        /* Empty State (PRD #21) */
        <div className="az-empty-state">
          <div className="az-empty-icon">
            <SearchX size={28} />
          </div>
          <h3 className="az-empty-title">Tidak menemukan nasyid.</h3>
          <p className="az-empty-desc">
            Coba gunakan kata kunci lain, atau sesuaikan filter bahasa dan jenis yang dipilih.
          </p>
          <button
            type="button"
            className="az-btn-reset"
            onClick={onResetFilters}
          >
            <RotateCcw size={16} />
            <span>Reset Filter & Pencarian</span>
          </button>
        </div>
      ) : (
        /* Song Cards Grid (PRD #14) */
        <div className="az-song-grid">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} currentQueue={songs} />
          ))}
        </div>
      )}
    </section>
  );
}
