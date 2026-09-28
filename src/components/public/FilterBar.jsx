import React from 'react';

export default function FilterBar({
  languages,
  selectedLanguage,
  setSelectedLanguage,
  types,
  selectedType,
  setSelectedType,
}) {
  return (
    <section className="az-filter-section" aria-label="Filter Nasyid">
      {/* Language Filter (PRD #10) */}
      <div className="az-filter-row">
        <span className="az-filter-label">Bahasa</span>
        <div className="az-filter-pills" role="tablist">
          {languages.map((lang) => {
            const isActive = selectedLanguage === lang.name || (lang.id === 'all' && selectedLanguage === 'Semua');
            return (
              <button
                key={lang.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`az-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedLanguage(lang.name)}
              >
                {lang.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Type Filter (PRD #11) */}
      <div className="az-filter-row">
        <span className="az-filter-label">Jenis</span>
        <div className="az-filter-pills" role="tablist">
          {types.map((type) => {
            const isActive = selectedType === type.name || (type.id === 'all' && selectedType === 'Semua');
            return (
              <button
                key={type.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`az-pill-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedType(type.name)}
              >
                {type.name}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
