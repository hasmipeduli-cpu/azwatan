import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

export default function HeroSection({ searchQuery, setSearchQuery }) {
  return (
    <section className="az-hero" aria-label="Hero dan Pencarian">
      <div className="az-container">
        <div className="az-hero-badge">
          <Sparkles size={14} />
          <span>Digital Nasyid Audio Library</span>
        </div>

        <h1 className="az-hero-title">
          Kumpulan Nasyid<br />
          <span>untuk Didengarkan.</span>
        </h1>

        <p className="az-hero-desc">
          Temukan dan dengarkan nasyid dari berbagai bahasa dan suasana langsung melalui browsermu, tanpa harus login.
        </p>

        {/* Search input (PRD #8 & #9) */}
        <div className="az-search-wrapper">
          <div className="az-search-box">
            <span className="az-search-icon">
              <Search size={20} />
            </span>
            <input
              type="text"
              className="az-search-input"
              placeholder="Cari judul, penyanyi, bahasa, atau tema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Cari nasyid"
              id="azwatan-main-search"
            />
            {searchQuery && (
              <button
                type="button"
                className="az-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Hapus pencarian"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
